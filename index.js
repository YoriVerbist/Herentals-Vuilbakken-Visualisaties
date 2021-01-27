/*
 * Basic responsive mashup template
 * @owner Yori Verbist
 */
/*
 *    Fill in host and port for Qlik engine
 */
 
 
connect();

async function connect() {
    const urlQlikServer = "https://yoriv.eu.qlikcloud.com";
    const urlLoggedIn = "/api/v1/audits";//Use GET request to see if you are authenticated
    const urlLogin = "/login";
    const webIntegrationId = 'EEOoDIgP234lUdXymAF9JJ0Bd3t4r9f0';        

    //Check to see if logged in
    return await fetch(`${urlQlikServer}${urlLoggedIn}`, {
        credentials: 'include',
        headers: {                  
            'Qlik-Web-Integration-ID':webIntegrationId
        }
    })
    .then(async function(response)
    {
        //check if user is authenticated; if not, redirect to login page
		if(response.status===401){
            const url = new URL(`${urlQlikServer}/login`);
            url.searchParams.append('returnto', 'http://localhost/index.html');
            url.searchParams.append('qlik-web-integration-id', webIntegrationId);
            window.location.href = url;
        }	
    })
    .catch(function(error)
    {
        console.error(error);
    });	
}		
 
var config1 = {
    host: "yoriv.eu.qlikcloud.com", //the address of your Qlik Engine Instance
    prefix: "/", //or the virtual proxy to be used. for example "/anonymous/"
    port: 443, //or the port to be used if different from the default port  
    isSecure: true, //should be true if connecting over HTTPS
    webIntegrationId: 'EEOoDIgP234lUdXymAF9JJ0Bd3t4r9f0' //only needed in SaaS editions and QSEoK
};

require.config( {
    baseUrl: (config1.isSecure ? "https://" : "http://" ) + config1.host + (config1.port ? ":" + config1.port : "") + config1.prefix + "resources",
    webIntegrationId: config1.webIntegrationId
} );	

require( ["js/qlik"], function ( qlik ) {
	
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );
	
	//open apps -- inserted here --
	var app = qlik.openApp("9e38b6b7-e11c-4539-a0b0-915b0cc429e0", config1);
	//get objects -- inserted here --
	app.getObject('QV01', 'cMZzTb'); // map nursing homes
	app.getObject('QV02', 'hBwSNB'); // scatter nursing homes
	app.getObject('QV03', 'hjeMP'); // Line chart daily cases
	app.getObject('QV04', 'ERWmLm'); // kpi daily cases
	app.getObject('QV06', 'TukJdUA'); // Bar acquisition cases
	app.getObject('QV08', 'vJGjtf'); // Positives vs negatives results/city
	app.getObject('QV09', 'zAP'); // Beds/nursing home
	app.getObject('QV10', 'Mzmv'); // map hopitals
	app.getObject('QV11', 'XnkWLZq'); // boxplot average patients in icu
	app.getObject('QV12', 'sWxz'); // scatter people in icu/hospital
	
	$("#ClearAll").click(function() {
	app.clearAll();
      });

} );