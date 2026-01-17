var Level1SHigh;
var Level1SLow;
var Level1SError;
var Level1PHigh;
var Level1PLow;
var Level1PError;
var Motor2

var lamp_color_control_Level1SHigh;
var lamp_color_control_Level1SLow;
var lamp_color_control_Level1SError;
var lamp_color_control_Level1PHigh;
var lamp_color_control_Level1PLow;
var lamp_color_control_Level1PError;
	
function Lamp_Control_Level1SHigh() 
         {
			if (Level1SHigh == "1")
			{
			lamp_color_control_Level1SHigh = "green";
			}else 
			{
			lamp_color_control_Level1SHigh = "red";
			}
			document.getElementById("Lamp_Control_Level1SHigh").style.background =lamp_color_control_Level1SHigh;
		 }			
function Lamp_Control_Level1SLow() 
         {
			if (Level1SLow == "1")
			{
			lamp_color_control_Level1SLow = "green";
			}else 
			{
			lamp_color_control_Level1SLow = "red";
			}
			document.getElementById("Lamp_Control_Level1SLow").style.background =lamp_color_control_Level1SLow;
		 }					
function Lamp_Control_Level1SError() 
         {
			if (Level1SError == "1")
			{
			lamp_color_control_Level1SError = "green";
			}else 
			{
			lamp_color_control_Level1SError = "red";
			}
			document.getElementById("Lamp_Control_Level1SError").style.background =lamp_color_control_Level1SError;
		 }			
function Lamp_Control_Level1PHigh() 
         {
			if (Level1PHigh == "1")
			{
			lamp_color_control_Level1PHigh = "green";
			}else 
			{
			lamp_color_control_Level1PHigh = "red";
			}
			document.getElementById("Lamp_Control_Level1PHigh").style.background =lamp_color_control_Level1PHigh;
		 }			
function Lamp_Control_Level1PLow() 
         {
			if (Level1SLow == "1")
			{
			lamp_color_control_Level1PLow = "green";
			}else 
			{
			lamp_color_control_Level1PLow = "red";
			}
			document.getElementById("Lamp_Control_Level1PLow").style.background =lamp_color_control_Level1PLow;
		 }					
function Lamp_Control_Level1PError() 
         {
			if (Level1PError == "1")
			{
			lamp_color_control_Level1PError = "green";
			}else 
			{
			lamp_color_control_Level1PError = "red";
			}
			document.getElementById("Lamp_Control_Level1PError").style.background =lamp_color_control_Level1PError;
		 }						
			