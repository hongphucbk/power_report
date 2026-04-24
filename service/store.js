require('dotenv').config();
var moment = require('moment');
var mongoose = require('mongoose');

var bodyParser = require('body-parser')
const express = require('express')
//-------------------------------------------------------------------
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

//---------------------------------------------------------------
// Defind model
const DeviceData = require('../models/DeviceData')

//---------------------------------------------------------------
// Mqtt
const mqtt = require('mqtt');
var options = {
    //port: 80,
    //host: 'mqtt://m11.cloudmqtt.com',
    username: 'iot2021',
    password: 'iot2021',
};

const Queue = require('../common/Queue')
let _queue = new Queue();
let _queue_station = new Queue();

const client = mqtt.connect(process.env.MQTT_URL, options );
let lastRunMap = {}; // lưu theo device

client.on("connect", ack => {
  console.log("MQTT Client Connected!");
  client.subscribe('IOT2/#'); // IOT/SITENAME/STATION/A51_01
  client.on("message", async (topic, message) => {
    //console.log(`MQTT Client Message.  Topic: ${topic}.  Message: ${message.toString()}`);
    // console.log(`MQTT Client Message.  Topic: ${topic}.`);
    try{
      let str_topic = topic.split('/');
      if(str_topic[0] == "IOT2"  && str_topic[3] != 'KVARH' && moment().second() < 30 && moment().minute() % 2 == 0){

        console.log(`MQTT Client Message.  Topic: ${topic}. Message: ${message.toString()}`);

        let deviceKey = `${str_topic[1]}_${str_topic[2]}_${str_topic[3]}`;
        let timeKey = moment().format("YYYY-MM-DD HH:mm");

        // ❗ check duplicate theo từng device
        if (lastRunMap[deviceKey] === timeKey) return;

        lastRunMap[deviceKey] = timeKey;


        let data = {
          Site: str_topic[1],
          Station: str_topic[2],
          Device: str_topic[3],
          KWH: message.toString().slice(36, 48),
          COSPHI: message.toString().slice(48, 60),
          Timestamp: new Date()
        };

        // data.Site = str_topic[1]
        // data.Station = str_topic[2]
        // data.Device = str_topic[3]
        // // data.V = message.toString().slice(0,12)
        // // data.A = message.toString().slice(12,24)
        // //data.KW = message.toString().slice(24,36)
        // data.KWH = message.toString().slice(36,48)
        // data.COSPHI = message.toString().slice(48,60)
        
        _queue.enqueue(data);
        //DeviceData.insertMany(data)
        //HistoryDeviceRawData.insertMany(data)
        //Device.findOneAndUpdate({_id: str_topic[1]}, {updated_at: new Date()}, function(){})
      }

    }catch(error){
      console.log('error', error.message)
    }
  });
});


async function processQueues() {
  try {
    console.log(_queue.getSize())
    if (_queue.getSize() > 0) {
      let data = _queue.dequeue();
      if (data) {
        await DeviceData.insertMany(data);
        //await HistoryDeviceRawData.insertMany(data);
        //await Device.findOneAndUpdate({ _id: data.device }, { updated_at: new Date() });
      }
    }

    
  } catch (err) {
    console.error('Queue processing error:', err.message);
  } finally {
    setTimeout(processQueues, 1000);
  }
}

processQueues(); // Start


client.on("error", err => {
  console.log(err);
});






