//on page load...
let key = '';
let data = null;
let ids = [];
function print_basic(json)
{
    let err_no = 1;
    let table = document.getElementById('report_body1');
    let rowCount = table.rows.length;
    let alerts = json['categories']['alert']; //alerts json object
    let contrast = json['categories']['contrast'];
    let errors = json['categories']['error'];
    let features = json['categories']['feature'];
    let structure = json['categories']['structure'];
    let aria = json['categories']['aria'];
    
    let heading = document.getElementById('report_heading');
    heading.innerHTML = "Accessibility Report for " + json['statistics']['pageurl'];



for (let x=rowCount-1; x>0; x--)
{
   table.deleteRow(x);
}

    if(errors['count'] > 0)
    {
        console.log(errors['items']);
        for(let x in errors['items'])
        {
            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell.innerHTML = err_no;
            cell2.innerHTML = errors['items'][x]['description'];
            cell3.innerHTML = "<b>Error</b>";
            console.log(errors['items'][x]['description']);
            ids.push(errors['items'][x]['id']);
            err_no++;
        }
    }

    if(alerts['count'] > 0)
    {
        console.log(alerts['items']);
        for(let x in alerts['items'])
        {
            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell.innerHTML = err_no;
            cell2.innerHTML = alerts['items'][x]['description'];
            cell3.innerHTML = "<b>Alert</b>";
            console.log(alerts['items'][x]['description']);
            ids.push(alerts['items'][x]['id']);
            err_no++;
        }
    }
    if(contrast['count'] > 0)
    {
        console.log(errors['items']);
        for(let x in contrast['items'])
        {
            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell.innerHTML = err_no;
            cell2.innerHTML = contrast['items'][x]['description'];
            cell3.innerHTML = "<b>Contrast</b>";
            console.log(contrast['items'][x]['description']);
            ids.push(contrast['items'][x]['id']);
            err_no++;
        }
    }

    if(structure['count'] > 0)
    {
        console.log(errors['items']);
        for(let x in structure['items'])
        {
            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell.innerHTML = err_no;
            cell2.innerHTML = structure['items'][x]['description'];
            cell3.innerHTML = "<b>Structure</b>";
            console.log(structure['items'][x]['description']);
            ids.push(structure['items'][x]['id']);
            err_no++;
        }
    }

    if(aria['count'] > 0)
    {
        console.log(errors['items']);
        for(let x in aria['items'])
        {
            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell.innerHTML = err_no;
            cell2.innerHTML = aria['items'][x]['description'];
            cell3.innerHTML = "<b>ARIA</b>";
            console.log(aria['items'][x]['description']);
            ids.push(aria['items'][x]['id']);
            console.log(ids);
            err_no++;
        }
    }
}
//todo: function that validates URL Return: T/F [x]
 function validate_url(url) 
 {
    const urlRegex = new RegExp("/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi");

    return url.match(url);
 }

function url_post()
{
    var urlText = document.getElementById('URL').value;
    if(validate_url(urlText))
    {
        const Http = new XMLHttpRequest();
        //https://wave.webaim.org/api/request?key={yourAPIkey}&reporttype=3&url=https://google.com/
        let APIurl= 'https://wave.webaim.org/api/request?key=WC7c5Wye2655&reporttype=2&url='+ urlText;
        let err_heading = document.getElementById('errors-heading');
        let tbl1 = document.getElementById('report_tbl1');
        err_heading.style.display = null;
        tbl1.style.display = null;
        Http.open("GET", APIurl, true);
        Http.overrideMimeType("application/json");
        Http.send();
    
        Http.onreadystatechange = function () {
        //handle stuff
        if(this.readyState == 4 && this.status == 200)
        {
            console.log(JSON.parse(Http.responseText));
            print_basic(JSON.parse(Http.responseText));
            //display tables
            data = JSON.parse(Http.responseText);
            //console.log(data);

        }
    }
}
    else
    {
        //invalid url
        alert("Invalid url");
    }
}
let submit = document.getElementById('submit');

submit.addEventListener("click", url_post);

let advBtnClicked = false;
//TODO: flip line 54 instead of 55	[x]
//todo: add on button click listener [x]
  
let advReport = document.getElementById('btnAdvReport');
let basicReport = document.getElementById('btnEZReport');
advReport.onclick = function(){
    advReport.disabled = true;
    basicReport.disabled = false;
    //hide other div report1
    document.getElementById('report_tbl1').style.display = 'none';
    document.getElementById('report_tbl2').style.display = null;
    //get advanced data
    let table = document.getElementById('report_body2');
    let rowCount = table.rows.length;
    for (let x=rowCount-1; x>0; x--)
    {
        table.deleteRow(x);
    }

    for(var i = 0; i < ids.length; i++)
    {
        console.log(ids[i]);
        const Http = new XMLHttpRequest();
        //https://wave.webaim.org/api/request?key={yourAPIkey}&reporttype=3&url=https://google.com/
        let url = 'https://wave.webaim.org/api/docs?id=' + ids[i];
        let err_heading = document.getElementById('errors-heading');
        Http.open("GET", url, true);
        Http.overrideMimeType("application/json");
        Http.send();
    
        Http.onreadystatechange = function () {
        //handle stuff
        if(this.readyState == 4 && this.status == 200)
        {
            let json = JSON.parse(Http.responseText);
            console.log(json);

            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell.innerHTML = i+1;
            cell.innerHTML = json["details"];
            cell2.innerHTML = json["actions"];
            let guidelines = json["guidelines"];
            console.log(guidelines);
            for(let guideline in guidelines)
            {
                cell3.innerHTML += "<a href="+ guidelines[guideline]["link"]+ ">"+ guidelines[guideline]["name"] + "</a><br>";
            }
            


        }
    }
}

}
basicReport.onclick = function(){
    advReport.disabled = false;
    basicReport.disabled = true;
    //hide other div report1
    document.getElementById('report_tbl2').style.display = 'none';
    document.getElementById('report_tbl1').style.display = null;

}
