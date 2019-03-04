/*---------------------------------------------
                Global variables
-----------------------------------------------*/

var escortCounter = 1;

/*---------------------------------------------
	       Active Escort functions
-----------------------------------------------*/

function appendToActiveEscorts(){   

		var driver = getDriver(document.getElementById("selDriver").value);
		var pickup = getLocation(document.getElementById("selPickup").value);
		var dropOff = getLocation(document.getElementById("selDropOff").value);
		var numPsngers = getNumPsngers(document.getElementById("selNumPsngers").value);

		var table = document.getElementById("table_active_escorts");
		var len = table.rows.length;
		var row = table.insertRow(len);
		var escNum = escortCounter;

		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);
		var cell5 = row.insertCell(5);
		var cell6 = row.insertCell(6);
		var cell7 = row.insertCell(7);
		var cell8 = row.insertCell(8);
		var cell9 = row.insertCell(9);

		cell0.innerHTML = escortCounter;

		if(driver == null)
			cell1.innerHTML = "-";
		else
			cell1.innerHTML = driver;

		cell2.innerHTML = pickup;
		cell3.innerHTML = dropOff;
		cell4.innerHTML = numPsngers;
		cell5.innerHTML = getCurrentTime();
		cell6.innerHTML = "<input type=\"checkbox\" id=\"activeEscortNoShow\">";
		cell7.innerHTML = `<button style=\"font-size:24px\" onclick=\"activeEscortEdit(${len}, ${escNum})\"><i class=\"material-icons\">mode_edit</i></button>`;
		cell8.innerHTML = `<button style=\"font-size:24px\" onclick=\"deleteActiveEscort(${len}, ${escNum})\"><i class=\"material-icons\">delete_forever</i></button>`
        
        if(driver == null)
            cell9.innerHTML = "-";
        else
            cell9.innerHTML = `<button style="font-size:24px" onclick=\"appendToCompletedEscorts(${len}, ${escNum})\"><i class="material-icons" style=\"color:#00cc00\">done</i></button>`;
			
		if(driver == null){
			cell0.className = "grid-item-not-assigned";
			cell1.className = "grid-item-not-assigned";
			cell2.className = "grid-item-not-assigned";
			cell3.className = "grid-item-not-assigned";
			cell4.className = "grid-item-not-assigned";
			cell5.className = "grid-item-not-assigned";
			cell6.className = "grid-item-not-assigned";
			cell7.className = "grid-item-not-assigned";
			cell8.className = "grid-item-not-assigned";
			cell9.className = "grid-item-not-assigned";
		} else {
			cell0.className = "grid-item";
			cell1.className = "grid-item";
			cell2.className = "grid-item";
			cell3.className = "grid-item";
			cell4.className = "grid-item";
			cell5.className = "grid-item";
			cell6.className = "grid-item";
			cell7.className = "grid-item";
			cell8.className = "grid-item";
			cell9.className = "grid-item";
		}
		escortCounter++;
}

function activeEscortEdit(rowNumber, escortID){

        var table = document.getElementById("table_active_escorts");
        var rowCounter = rowNumber;
        var row = null;
        var foundCorrectRow = false;

        do{
                if(document.getElementById("table_active_escorts").rows[rowCounter] == null)
                        rowCounter = rowCounter - 1;
                else {
                        row = document.getElementById("table_active_escorts").rows[rowCounter].cells;

                        if(escortID.toString() == row[0].innerHTML)
                            foundCorrectRow = true;
                        else
                            rowCounter = rowCounter - 1;
                }
        } while(rowCounter > 0 && foundCorrectRow == false);

        row[0].innerHTML = escortID;

		var prefix = "<select id=\"selDriverActive\">";
		var infix = buildSelectBoxForEditDriver(row[1].innerHTML, "active_escort");
		var postfix = "</select>";
        row[1].innerHTML = prefix + infix + postfix;

        prefix = "<select id=\"selPickupActive\">";
        infix = buildSelectBoxForEditPD(row[2].innerHTML);
        row[2].innerHTML = prefix + infix + postfix;

        prefix = "<select id=\"selDropOffActive\">";
        infix = buildSelectBoxForEditPD(row[3].innerHTML);
        row[3].innerHTML = prefix + infix + postfix;

		prefix = "<select id=\"selNumPsngersActive\">";
		infix = buildSelectBoxForNumPsngers(row[4].innerHTML);                
        row[4].innerHTML = prefix + infix + postfix;
    
        row[7].innerHTML = `<input type=\"submit\" value=\"Finished\" onclick=\"finishedEditingActiveEscort(${rowCounter}, ${escortID})\">`;
		row[8].innerHTML = "-";
		row[9].innerHTML = "-";
}

function finishedEditingActiveEscort(rowNumber, counter){

        row = document.getElementById("table_active_escorts").rows[rowNumber].cells;
	    var driver = getDriver(document.getElementById("selDriverActive").value);

	    if(driver == "-"){
			row[0].className = "grid-item-not-assigned";
			row[1].className = "grid-item-not-assigned";
			row[2].className = "grid-item-not-assigned";
			row[3].className = "grid-item-not-assigned";
			row[4].className = "grid-item-not-assigned";
			row[5].className = "grid-item-not-assigned";
			row[6].className = "grid-item-not-assigned";
			row[7].className = "grid-item-not-assigned";
			row[8].className = "grid-item-not-assigned";
			row[9].className = "grid-item-not-assigned";
		} else {
			row[0].className = "grid-item";
			row[1].className = "grid-item";
			row[2].className = "grid-item";
			row[3].className = "grid-item";
			row[4].className = "grid-item";
			row[5].className = "grid-item";
			row[6].className = "grid-item";
			row[7].className = "grid-item";
			row[8].className = "grid-item";
			row[9].className = "grid-item";
		}

        row[1].innerHTML = driver;
        row[2].innerHTML = getLocation(document.getElementById("selPickupActive").value);
        row[3].innerHTML = getLocation(document.getElementById("selDropOffActive").value);
        row[4].innerHTML = getNumPsngers(document.getElementById("selNumPsngersActive").value);
        row[7].innerHTML = `<button style=\"font-size:24px\" onclick=\"activeEscortEdit(${rowNumber}, ${counter})\"><i class=\"material-icons\">mode_edit</i></button>`;
        row[8].innerHTML = `<button style=\"font-size:24px\" onclick=\"deleteActiveEscort(${rowNumber}, ${counter})\"><i class=\"material-icons\">delete_forever</i></button>`;
    
        if(driver == "-")
            row[9].innerHTML = "-";
        else
            row[9].innerHTML = `<button style="font-size:24px" onclick=\"appendToCompletedEscorts(${rowNumber}, ${counter})\"><i class="material-icons" style=\"color:#00cc00\">done</i></button>`;
}

function deleteActiveEscort(rowNumber, counter){
	    var table = document.getElementById("table_active_escorts");
        var rowCounter = rowNumber;
        var row = null;
        var foundCorrectRow = false;

        do{
            if(document.getElementById("table_active_escorts").rows[rowCounter] == null)
                    rowCounter = rowCounter - 1;
            else {
                    row = document.getElementById("table_active_escorts").rows[rowCounter].cells;
                    if(counter.toString() == row[0].innerHTML)
                        foundCorrectRow = true;
                    else
                        rowCounter = rowCounter - 1;
                }
        } while(rowCounter > 0 && foundCorrectRow == false);
		document.getElementById("table_active_escorts").deleteRow(rowCounter);
}

function buildNoShowCheckBox(noShow){
		if(noShow)
			return "<input type=\"checkbox\" id=\"completedEscortNoShow\" name=\"noShow\" value=\"showedUp\" checked>";
		return "<input type=\"checkbox\" id=\"completedEscortNoShow\" name=\"noShow\" value=\"showedUp\">";
}  

/*--------------------------------------------------
	       Completed Escort functions
---------------------------------------------------*/

function appendToCompletedEscorts(rowNumber, counter){
        var table = document.getElementById("table_completed_escorts");
        var rowCounter = rowNumber;
        var row = null;
        var foundCorrectRow = false;

        do{
                if(document.getElementById("table_active_escorts").rows[rowCounter] == null)
                        rowCounter = rowCounter - 1;
                else {
                        row = document.getElementById("table_active_escorts").rows[rowCounter].cells;
                        if(counter.toString() == row[0].innerHTML)
                            foundCorrectRow = true;
                        else
                            rowCounter = rowCounter - 1;
                }
	    } while(rowCounter > 0 && foundCorrectRow == false);

		var escNum = row[0].innerHTML;
		var driver = row[1].innerHTML;
		var pickup = row[2].innerHTML;
		var dropOff = row[3].innerHTML;
		var numPsngers = row[4].innerHTML;
		var pickupTime = row[5].innerHTML;

		var noShow = document.getElementById("activeEscortNoShow").checked;

		document.getElementById("table_active_escorts").deleteRow(rowCounter);

		var len = table.rows.length;
		var row = table.insertRow(len);

		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		var cell4 = row.insertCell(4);
		var cell5 = row.insertCell(5);
		var cell6 = row.insertCell(6);
		var cell7 = row.insertCell(7);
		var cell8 = row.insertCell(8);

		cell0.innerHTML = escNum;
		cell1.innerHTML = driver;
		cell2.innerHTML = pickup;
		cell3.innerHTML = dropOff;
		cell4.innerHTML = numPsngers;
		cell5.innerHTML = pickupTime;

		if(noShow)
			cell6.innerHTML = "-";
		else

			cell6.innerHTML = getCurrentTime();

		cell7.innerHTML = buildNoShowCheckBox(noShow);
		cell8.innerHTML = `<button style=\"font-size:24px\" onclick=\"completedEscortEdit(${len}, ${escNum})\"><i class=\"material-icons\">mode_edit</i></button>`; 
		
		cell0.className = "grid-item";
		cell1.className = "grid-item";
		cell2.className = "grid-item";
		cell3.className = "grid-item";
		cell4.className = "grid-item";
		cell5.className = "grid-item";
		cell6.className = "grid-item";
		cell7.className = "grid-item";
		cell7.className = "grid-item";
		cell8.className = "grid-item";
}


function completedEscortEdit(rowNumber, escortID){
        var table = document.getElementById("table_completed_escorts");
        var rowCounter = rowNumber;
        var row = null;
        var foundCorrectRow = false;
        
        do{
                if(document.getElementById("table_completed_escorts").rows[rowCounter] == null)
                        rowCounter = rowCounter - 1;
                else {
                    row = document.getElementById("table_completed_escorts").rows[rowCounter].cells;
                    if(escortID.toString() == row[0].innerHTML)
                            foundCorrectRow = true;
                    else
                        rowCounter = rowCounter - 1;
                }
        } while(rowCounter > 0 && foundCorrectRow == false);

        row[0].innerHTML = escortID;

		var prefix = "<select id=\"selDriverCompleted\">";
		var infix = buildSelectBoxForEditDriver(row[1].innerHTML, "completed_escort");
		var postfix = "</select>";
        row[1].innerHTML = prefix + infix + postfix;

        prefix = "<select id=\"selPickupCompleted\">";
        infix = buildSelectBoxForEditPD(row[2].innerHTML);
        row[2].innerHTML = prefix + infix + postfix;

        prefix = "<select id=\"selDropOffCompleted\">";
        infix = buildSelectBoxForEditPD(row[3].innerHTML);
        row[3].innerHTML = prefix + infix + postfix;

		prefix = "<select id=\"selNumPsngersCompleted\">";
		infix = buildSelectBoxForNumPsngers(row[4].innerHTML);                
        row[4].innerHTML = prefix + infix + postfix;
        
		row[8].innerHTML = `<input type=\"submit\" value=\"Finished\" onclick=\"finishedEditingCompletedEscort(${rowCounter}, ${escortID})\">`;
}

function finishedEditingCompletedEscort(rowNumber, counter){
        row = document.getElementById("table_completed_escorts").rows[rowNumber].cells;
        row[1].innerHTML = getDriver(document.getElementById("selDriverCompleted").value);
        row[2].innerHTML = getLocation(document.getElementById("selPickupCompleted").value);
        row[3].innerHTML = getLocation(document.getElementById("selDropOffCompleted").value);
        row[4].innerHTML = getNumPsngers(document.getElementById("selNumPsngersCompleted").value);
        row[8].innerHTML = `<button style=\"font-size:24px\" onclick=\"completedEscortEdit(${rowNumber}, ${counter})\"><i class=\"material-icons\">mode_edit</i></button>`; 
}

/*--------------------------------------------
	           Utility functions
-----------------------------------------------*/

function printCompletedEscorts(){
        var i = 1;
        
        var tableBeginTag = "<table id=\"table_print\" style=\"table-layout: auto;border-radius: 0 0 0 8px;border-collapse: collapse;width: 100%;margin-top: 20px;margin-bottom: 20px;margin-left: 5px;margin-right: 5px;\">";
        var tableEndTag = "</table>";
        
        var tableHeader = "<tr>" +
					"<td style=\"background-color: #ffffff;border: 1px solid rgba(0, 0, 0, 0.8);padding-top: 5px;padding-bottom: 5px;text-align: center\">Escort Num" +
					"</td>" +
					"<td style=\"background-color: #ffffff;border: 1px solid rgba(0, 0, 0, 0.8);padding-top: 5px;padding-bottom: 5px;text-align: center\">Assigned To" +
 					"</td>" +
					"<td style=\"background-color: #ffffff;border: 1px solid rgba(0, 0, 0, 0.8);padding-top: 5px;padding-bottom: 5px;text-align: center\">From" +
 					"</td>" +
					"<td style=\"background-color: #ffffff;border: 1px solid rgba(0, 0, 0, 0.8);padding-top: 5px;padding-bottom: 5px;text-align: center\">To" +
 					"</td>" +
					"<td style=\"background-color: #ffffff;border: 1px solid rgba(0, 0, 0, 0.8);padding-top: 5px;padding-bottom: 5px;text-align: center\">Num Passengers" +
 					"</td>" +
					"<td style=\"background-color: #ffffff;border: 1px solid rgba(0, 0, 0, 0.8);padding-top: 5px;padding-bottom: 5px;text-align: center\">Pickup Time" +
 					"</td>" +
					"<td style=\"background-color: #ffffff;border: 1px solid rgba(0, 0, 0, 0.8);padding-top: 5px;padding-bottom: 5px;text-align: center\">Dropoff Time" +
 					"</td>" +
					"<td style=\"background-color: #ffffff;border: 1px solid rgba(0, 0, 0, 0.8);padding-top: 5px;padding-bottom: 5px;text-align: center\">No Show" +
 					"</td>" +
        			"</tr>"; 
        
        var tdBeginTag = "<td style=\"background-color: #ffffff;border: 1px solid rgba(0, 0, 0, 0.8);padding-top: 5px;padding-bottom: 5px;text-align: center\">";
        var tdEndTag = "</td>";
        
        var trBeginTag = "<tr>";
        var trEndTag = "</tr>";
        
        var numRows = document.getElementById("table_completed_escorts").rows.length;
        var currentDate = getDate();
        var outputString = currentDate + "<br>";
        outputString +=  tableBeginTag + tableHeader;
        
        while(i < numRows){
            var row = document.getElementById("table_completed_escorts").rows[i].cells;
            outputString += trBeginTag +
                            tdBeginTag + row[0].innerHTML + tdEndTag +
                            tdBeginTag + row[1].innerHTML + tdEndTag +
                            tdBeginTag + row[2].innerHTML + tdEndTag +
                            tdBeginTag + row[3].innerHTML + tdEndTag +
                            tdBeginTag + row[4].innerHTML + tdEndTag +
                            tdBeginTag + row[5].innerHTML + tdEndTag +
                            tdBeginTag + row[6].innerHTML + tdEndTag +
                            tdBeginTag + row[7].innerHTML + tdEndTag +
                            trEndTag;
            if(i == 17){
                outputString += tableEndTag + "<div style=\"display: block; page-break-before: always;\"></div>" + tableBeginTag +tableHeader;
                
            }
            if( (i >= 36) && (i % 18) == 0 )
                outputString += tableEndTag + "<div style=\"display: block; page-break-before: always;\"></div>" + tableBeginTag +tableHeader;
            i++;
         
        }
        outputString += tableEndTag; 

        var myWindow = window.open("", "MsgWindow", "width=750,height=500");
        myWindow.document.write(outputString);
}

function buildSelectBoxForEditPD(currentPickup){
		var selectBoxString = "";
		var currentValue = getLocationValue(currentPickup);
		var currentHTML = "<option value=\"" + currentValue + "\">" + currentPickup + "</option>";

		selectBoxString += currentHTML;


        if(currentPickup != "1150 W. Fullerton")
			selectBoxString += "<option value=\"elevenfifty\">1150 W. Fullerton</option>";
		if(currentPickup != "990 W. Fullerton")
			selectBoxString += "<option value=\"nineninety\">990 W. Fullerton</option>";
		if(currentPickup != "2400 W. Fullerton")
			selectBoxString += "<option value=\"twentyfourhundred\">2400 W. Fullerton</option>";
        if(currentPickup != "Arts and Letters")
			selectBoxString += "<option value=\"artsAndLetters\">Arts and Letters</option>";
        if(currentPickup != "ATC Annex")
			selectBoxString += "<option value=\"atcAnnex\">ATC Annex</option>";
        if(currentPickup != "ATC (Sullivan Athletic Center)")
			selectBoxString += "<option value=\"atc\">ATC (Sullivan Athletic Center)</option>";
        if(currentPickup != "Belden/Racine Hall")
			selectBoxString += "<option value=\"belRacineHall\">Belden/Racine Hall</option>";
        if(currentPickup != "Byrne")
			selectBoxString += "<option value=\"byrne\">Byrne</option>";
        if(currentPickup != "Centennial Hall")
			selectBoxString += "<option value=\"centennial\">Centennial Hall</option>";
        if(currentPickup != "Clifton/Fullerton Hall")
			selectBoxString += "<option value=\"clifFulHall\">Clifton/Fullerton Hall</option>";
        if(currentPickup != "Clifton Parking Garage")
			selectBoxString += "<option value=\"cliftonParking\">Clifton Parking Garage</option>";
        if(currentPickup != "College of Education")
			selectBoxString += "<option value=\"coe\">College of Education</option>";
        if(currentPickup != "Concert Hall")
			selectBoxString += "<option value=\"concert\">Concert Hall</option>";
        if(currentPickup != "Corcoran Hall")
			selectBoxString += "<option value=\"corcoran\">Corcoran Hall</option>";
        if(currentPickup != "Cortelyou Commons")
			selectBoxString += "<option value=\"commons\">Cortelyou Commons</option>";
        if(currentPickup != "Courtside Apartments")
			selectBoxString += "<option value=\"courtsideApartments\">Courtside Apartments</option>";
        if(currentPickup != "L")
			selectBoxString += "<option value=\"el\">L</option>";
        if(currentPickup != "Library")
			selectBoxString += "<option value=\"library\">Library</option>";
		if(currentPickup != "McCabe Hall")
			selectBoxString += "<option value=\"mccabe\">McCabe Hall</option>";
        if(currentPickup != "McGowan South")
			selectBoxString += "<option value=\"mcgowanSouth\">McGowan South</option>";
        if(currentPickup != "Munroe Hall")
			selectBoxString += "<option value=\"munHall\">Munroe Hall</option>";
        if(currentPickup != "Quad")
			selectBoxString += "<option value=\"quad\">Quad</option>";
        if(currentPickup != "Racine Properties")
			selectBoxString += "<option value=\"racineProp\">Racine Properties</option>";
        if(currentPickup != "Ray Meyer Fitness Center")
			selectBoxString += "<option value=\"ray\">Ray Meyer Fitness Center</option>";
        if(currentPickup != "SAC")
			selectBoxString += "<option value=\"sac\">SAC</option>";
        if(currentPickup != "Sanctuary Hall")
			selectBoxString += "<option value=\"sanctuaryHall\">Sanctuary Hall</option>";
        if(currentPickup != "Sanctuary Townhomes")
			selectBoxString += "<option value=\"sanctuaryTownhomes\">Sanctuary Townhomes</option>";
        if(currentPickup != "School of Music")
			selectBoxString += "<option value=\"schoolOfMusic\">School of Music</option>";
        if(currentPickup != "School of Music Annex")
			selectBoxString += "<option value=\"schoolOfMusicAnnex\">School of Music Annex</option>";
        if(currentPickup != "Sheffield Parking Garage")
			selectBoxString += "<option value=\"sheffieldParking\">Sheffield Parking Garage</option>";
        if(currentPickup != "Sheffield Square Apartments")
			selectBoxString += "<option value=\"shefSqApts\">Sheffield Square Apartments</option>";
        if(currentPickup != "St. Vincent's Church")
			selectBoxString += "<option value=\"church\">St. Vincent's Church</option>";
        if(currentPickup != "Student Center")
			selectBoxString += "<option value=\"studentCenter\">Student Center</option>";
        if(currentPickup != "Theatre School")
			selectBoxString += "<option value=\"theatre\">Theatre School</option>";
		if(currentPickup != "University Hall")
			selectBoxString += "<option value=\"univHall\">University Hall</option>";
		if(currentPickup != "Vincentian Residence")
			selectBoxString += "<option value=\"vincentianRes\">Vincentian Residence</option>";
        if(currentPickup != "Vincent and Louise House")
			selectBoxString += "<option value=\"vincentAndLouise\">Vincent and Louise House</option>";
		if(currentPickup != "Wish Field")
			selectBoxString += "<option value=\"wishField\">Wish Field</option>";

		return selectBoxString;     
}

function buildSelectBoxForEditDriver(currentSelect, table){

		var selectBoxString = "";
		var currentValue = getDriverValue(currentSelect);
		var currentHTML = "<option value=\"" + currentValue + "\">" + currentSelect + "</option>";

		selectBoxString += currentHTML;

        if(currentSelect != "-" && table === "active_escort")
			selectBoxString += "<option value=\"null\">-</option>";
		if(currentSelect != "L50")
			selectBoxString += "<option value=\"l50\">L50</option>";
		if(currentSelect != "L1")
			selectBoxString += "<option value=\"l1\">L1</option>";
        if(currentSelect != "L2")
			selectBoxString += "<option value=\"l2\">L2</option>";
		if(currentSelect != "L80")
			selectBoxString += "<option value=\"l80\">L80</option>";
		if(currentSelect != "L1A")
			selectBoxString += "<option value=\"l1A\">L1A</option>";
		if(currentSelect != "L1B")
			selectBoxString += "<option value=\"l1B\">L1B</option>";
		if(currentSelect != "L1C")
			selectBoxString += "<option value=\"l1C\">L1C</option>";
		if(currentSelect != "L2A")
			selectBoxString += "<option value=\"l2A\">L2A</option>";
		if(currentSelect != "L2B")
			selectBoxString += "<option value=\"l2B\">L2B</option>";
		return selectBoxString;    						
}

function buildSelectBoxForNumPsngers(currentNumPsngers){
		var selectBoxString = "";
		var currentValue = getNumPsngersValue(currentNumPsngers);
		var currentHTML = "<option value=\"" + currentValue + "\">" + currentNumPsngers + "</option>";

		selectBoxString += currentHTML;

		if(currentNumPsngers != "1")
			selectBoxString += "<option value=\"one\">1</option>";
		if(currentNumPsngers != "2")
			selectBoxString += "<option value=\"two\">2</option>";
		if(currentNumPsngers != "3")
			selectBoxString += "<option value=\"three\">3</option>";

		return selectBoxString;
}   

function insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
}

function getDate(){
        var currentDate = new Date();
        var dateString = currentDate.toString();
        return dateString.substr(0, 15);
}

function getLandingPageDate(){
        document.getElementById("date").innerHTML = getDate();
}

function getCurrentTime(){
        var d = new Date();
        var dateString = d.toString();
        var timeString = dateString.substr(16, 8);
        var hoursString = timeString.substr(0,2);
        var minutesString = timeString.substr(3,2);
        var secondsString = timeString.substr(6,2);
        var hoursInt = parseInt(hoursString);

		if(hoursInt >= 12){
			var adjustedHours;
			if(hoursInt == 12)
				adjustedHours = 12;
			else
				adjustedHours = hoursInt - 12;
			return adjustedHours + ":" + minutesString + ":" + secondsString + " PM";
		}

		return hoursInt + ":" + minutesString + ":" + secondsString + " AM";		
}

function getLocationValue(pickup){
        switch(pickup){
            case "1150 W. Fullerton":
                return "elevenfifty";
            case "990 W. Fullerton":
                return "nineninety";
            case "2400 W. Fullerton":
                return "twentyfourhundred";
            case "Arts and Letters":
                return "artsAndLetters";
            case "ATC Annex":
                return "atcAnnex";
            case "ATC (Sullivan Athletic Center)":
                return "atc";
            case "Belden/Racine Hall":
                return "belRacineHall";
            case "Byrne":
                return "byrne";
            case "Centennial Hall":
                return "centennial"; 
            case "Clifton/Fullerton Hall":
                return "clifFulHall";
            case "Clifton Parking Garage":
                return "cliftonParking";
            case "College of Education":
                return "coe";
            case "Concert Hall":
                return "concert";
            case "Corcoran Hall":
                return "corcoran";
            case "Cortelyou Commons":
                return "commons";
            case "Courtside Apartments":
                return "courtsideApartments";
            case "L":
                return "el";
            case "Library":
                return "library";
            case "McCabe Hall": 
                return "mccabe";
            case "McGowan South":
                return "mcgowanSouth";
            case "Munroe Hall":
                return "munHall";
            case "Quad":
                return "quad";
            case "Racine Properties":
                return "racineProp"; 
            case "Ray Meyer Fitness Center":
                return "ray";
            case "SAC":
                return "sac";
            case "Sanctuary Townhomes":
                return "sanctuaryTownhomes";
            case "Sanctuary Hall":
                return "sanctuaryHall";
            case "School of Music":
                return "schoolOfMusic";
            case "School of Music Annex":
                return "schoolOfMusicAnnex";
            case "Sheffield Parking Garage":
                return "sheffieldParking";
            case "Sheffield Square Apartments":
                return "shefSqApts";
            case "St. Vincent's Church":
                return "church";  
            case "Student Center":
                return "studentCenter";
            case "Theatre School":
                return "theatre";    
            case "University Hall": 
                return "univHall";
            case "Vincentian Residence":
                return "vincentianRes";
            case "Vincent and Louise House":
                return "vincentAndLouise";
            case "Wish Field":
                return "wishField";
        }    
}

function getDriver(driver){
        switch(driver){
            case "null":
                return "-";
            case "l50":
                return "L50";
            case "l1":
                return "L1";
            case "l2":
                return "L2";
            case "l80":
                return "L80";
            case "l1A":
                return "L1A";
            case "l1B":
                return "L1B";
            case "l1C":
                return "L1C";
            case "l2A":
                return "L2A";
            case "l2B":
                return "L2B";
        }
}

function getDriverValue(driver){
        switch(driver){
            case "-":
                return "null";
            case "L50":
                return "l50";
            case "L1":
                return "l1";
            case "L2":
                return "l2";
            case "L80":
                return "l80";
            case "L1A":
                return "l1A";
            case "L1B":
                return "l1B";
            case "L1C":
                return "l1C";
            case "L2A":
                return "l2A";
            case "L2B":
                return "l2B";
        }
}

function getLocation(pickup){
    switch(pickup){
        case "elevenfifty":
            return "1150 W. Fullerton";
        case "nineninety":
            return "990 W. Fullerton";
        case "twentyfourhundred": 
            return "2400 W. Fullerton";
        case "artsAndLetters":
            return "Arts and Letters";
        case "atcAnnex":
            return "ATC Annex";
        case "atc":
            return "ATC (Sullivan Athletic Center)";
        case "belRacineHall": 
            return "Belden/Racine Hall";
        case "byrne":
            return "Byrne";
        case "centennial":
            return "Centennial Hall"; 
        case "clifFulHall":
            return "Clifton/Fullerton Hall";
        case "cliftonParking":
            return "Clifton Parking Garage";
        case "coe":
            return "College of Education";
        case "concert":
            return "Concert Hall";
        case "corcoran":
            return "Corcoran Hall";
        case "commons":
            return "Cortelyou Commons";
        case "courtsideApartments":
            return "Courtside Apartments";
        case "el":
            return "L";
        case "library":
            return "Library";
        case "mccabe": 
            return "McCabe Hall";
        case "mcgowanSouth":
            return "McGowan South";
        case "munHall":
            return "Munroe Hall";
        case "quad":
            return "Quad";
        case "racineProp":
            return "Racine Properties"; 
        case "ray":
            return "Ray Meyer Fitness Center";
        case "sac":
            return "SAC";
        case "sanctuaryTownhomes":
            return "Sanctuary Townhomes";
        case "sanctuaryHall":
            return "Sanctuary Hall";
        case "schoolOfMusic":
            return "School of Music";
        case "schoolOfMusicAnnex":
            return "School of Music Annex";
        case "sheffieldParking":
            return "Sheffield Parking Garage";
        case "shefSqApts":
            return "Sheffield Square Apartments";
        case "church":
            return "St. Vincent's Church";  
        case "studentCenter":
            return "Student Center";
        case "theatre":
            return "Theatre School";    
        case "univHall": 
            return "University Hall";
        case "vincentianRes":
            return "Vincentian Residence";
        case "vincentAndLouise":
            return "Vincent and Louise House";
        case "wishField":
            return "Wish Field";
    }      
}

function getNumPsngersValue(numPsngers){
    switch(numPsngers){
        case "1":
            return "one";
        case "2":
            return "two";
        case "3":
            return "three";
    }
}

function getNumPsngers(numPsngers){
    switch(numPsngers){
        case "one":
            return "1";
        case "two":
            return "2";
        case "three":
            return "3";
    }
}
