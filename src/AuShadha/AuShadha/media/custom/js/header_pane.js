/*
    Contains the Logic of eventing in Patient Search Form Partly.
    Some of it is implemented in the HTML declaratively.
    Triggered when the patient search text is entered
    A separate trigger is present in search/patient.html
    for handling the click event of the Filter button
*/

define (["dojox/timing",
        "dojo/dom",
        "dojo/dom-style",
        "dojo/dom-construct",
        "dijit/registry",
        "dojo/date/locale",
        "dojo/ready",
//         "aushadha/grid_setup_alt.js",
        "dojo/domReady!"
],
function(timing,dom,domStyle,domConstruct,registry,dateLocale,ready){

    var headerPane= {
            headerTimer : function(){
                            console.log("Starting script events.js");
                            ready(function(){
                              var t = new timing.Timer(60000);
                              var fmt = "MMMM d yyyy  - hh:mm ";
                              function dateFormat(d, f){
                                return dojo.date.locale.format(d, {selector: "date", datePattern: f})
                              }
                              t.onTick = function(){
                                var timeNow = new Date();
                                var timeBox = dom.byId("timeBox").innerHTML = dateFormat(timeNow, fmt);
                              }
                              t.onStart = function(){
                                var timeNow = new Date();
                                var timeBox = dom.byId("timeBox").innerHTML = dateFormat(timeNow, fmt);
                              }
                              t.start();
                            });
                        },

            patSearchOnKeyUp:  function (e){
                                    console.log(e.target);
                                    var search_field   = patSearchForFilteringSelect.get('value');
                                    var txt            = filterPatGridTextBox.get('value');
                                    var search_obj     = { search_field : search_field , search_for : txt };
                                    if( !filterPatGridTextBox.get('value') || !patSearchForFilteringSelect.get('value') ){
                                      search_obj.search_for   = "*"
                                      search_obj.search_field = "id"
                                    }
                                    grid.filter(search_obj, true);
                                },

            patFilteringSearchOnKeyUp:function (e){
                                        e.store.get(e.get('value')).then(
                                          function(item /*returned item*/){
                                            console.log(item)
                                            var addData = item.addData;
                                            renderGridsFormsAndTrees(addData);
                                          }
                                        );
                                      },


            patSearchForFilteringSelectOnChange:function (newVal){
                                                    if(newVal){
                                                      console.log(newVal);
                                                      if(newVal == 'full_name'){
                                                        dojo.byId("searchLinker").innerHTML = "contains..";
                                                        filterPatGridTextBox.focus();
                                                      }
                                                      else if(newVal == 'id'){
                                                        dojo.byId("searchLinker").innerHTML = "equal to";
                                                        filterPatGridTextBox.focus();
                                                      }
                                                      else{
                                                        dojo.byId("searchLinker").innerHTML = "starts with..";
                                                        filterPatGridTextBox.focus();
                                                      }
                                                    }
                                                    else{
                                                      console.log("No Selection Supplied.. Enforcing Full Name selection..")
                                                      patSearchForFilteringSelect.set('displayedValue', 'Full Name');
                                                      dojo.byId("searchLinker").innerHTML = "contains..";
                                                      filterPatGridTextBox.focus();
                                                    }
                                              },


    renderGridsFormsAndTrees : function (addData/*Data Object Containing all URLS*/){
                                      CHOSEN_PATIENT = addData;
                                      domStyle.set('selected_patient_info',{"display":"",
                                                                            "padding":"0px",
                                                                            "margin":"0px"
                                      });
                                      var selectedPatientContent = addData.full_name + "-" +
                                                                  addData.age +"-" + addData.sex +
                                                                  "(" +addData.patient_hospital_id +")";
                                      registry.byId('selected_patient_info').set('content', selectedPatientContent);
                                      var patientInfo = dom.byId('selected_patient_info');
                                      domConstruct.create("div",{ innerHTML: addData.id,
                                                                  id       : "selected_patient_id_info",
                                                                  style    : { display:"none" }
                                                                },
                                                                patientInfo
                                      );
                                      console.log( dom.byId('selected_patient_id_info').innerHTML )

                                      var patientSummaryUrl           = addData.patientsummary;
                                      var patientSidebarDivContactUrl = addData.sidebarcontacttab;

                                      var contactUrl        = addData.contactjson;
                                      //  var contactAddUrl     = addData.contactaddurl;
                                      var phoneUrl          = addData.phonejson;
                                      var guardianUrl       = addData.guardianjson;
                                      var emailUrl          = addData.emailjson;

                                      var immunisationUrl   = addData.immunisationjson;
                                      var allergiesUrl      = addData.allergiesjson;
                                      var medicationListUrl = addData.medicationlistjson;

                                      var familyHistoryUrl    = addData.familyhistoryjson;
                                      var medicalHistoryUrl   = addData.medicalhistoryjson;
                                      var surgicalHistoryUrl  = addData.surgicalhistoryjson;

                                      var demographicsUrl   = addData.demographicsadd;
                                      var socialHistoryUrl  = addData.socialhistoryadd;

                                      //  var admissionUrl      = addData.admissionadd;
                                      //  var visitUrl          = addData.visitadd;

                                      reInitBottomPanels();
                          }
        }
        ready(function(){ headerPane.headerTimer(); });
        return headerPane;
 });                      