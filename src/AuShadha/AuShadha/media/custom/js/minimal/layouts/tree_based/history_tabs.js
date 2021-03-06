function createHistoryTabs(){
    require([
            "dojo/dom",
            'dojo/dom-class',
            'dojo/dom-style',
            'dojo/dom-construct',
            'dojo/on',

            'dijit/registry',
            'dijit/layout/BorderContainer',
            'dojox/layout/ContentPane',
            'dijit/layout/TabContainer',
            'dijit/form/Button',
            "dijit/Dialog",
            "dojo/request",
            "dojo/json",
            "dojo/domReady!"
            ],
    function(dom,
             domClass,
             domStyle,
             domConstruct,
             on,
             registry,
             BorderContainer,
             ContentPane,
             TabContainer,
             Button,
             Dialog,
             request,
             JSON
    ){

          function createHistoryDoms(){
            if( dom.byId('patientHistoryTab') == undefined ){
              domConstruct.create('div',
                                      {id: "patientHistoryTab"},
                                      "patientContextTabs",
                                      "last"
                  );

                    domConstruct.create('div',
                                        {id: "patientHistoryTabs"},
                                        "patientHistoryTab",
                                        "first"
                    );
                      domConstruct.create('div',
                                          {id: "patientSocialHistoryTab"},
                                          "patientHistoryTabs",
                                          "first"
                      );
                      domConstruct.create('div',
                                          {id: "patientFamilyHistoryTab"},
                                          "patientHistoryTabs",
                                          "last"
                      );
                        domConstruct.create('div',
                                            {id: "family_history_list"},
                                            "patientFamilyHistoryTab",
                                            "first"
                        );
                      domConstruct.create('div',
                                          {id: "patientMedicalAndSurgicalHistoryTab"},
                                          "patientHistoryTabs",
                                          "last"
                      );

                        domConstruct.create('div',
                                            {id: "medical_history_list"},
                                            "patientMedicalAndSurgicalHistoryTab",
                                            "first"
                        );
                        domConstruct.create('div',
                                            {id: "surgical_history_list"},
                                            "patientMedicalAndSurgicalHistoryTab",
                                            "last"
                        );
            }
//             createHistoryDijits();
          }

          function createHistoryDijits(){
            //{% if perms.patient %}
              if(registry.byId('patientHistoryTab')){
                registry.byId('patientHistoryTab').destroyRecursive(false);
              }
              var historyTab = new ContentPane({id:"patientHistoryTab",
                                                title:"History",
                                                closable:true
                                    },
                                    "patientHistoryTab"
                                    );
              registry.byId("patientContextTabs").addChild(historyTab);

              var historyTabs = new TabContainer({id:"patientHistoryTabs",
                                                  tabPosition:"top",
                                                  tabStrip:true,
                                                  nested : true,
                                                  style : "min-height: 550px;overflow:auto;"
                                                },
                                                "patientHistoryTabs"
                                                );
              historyTab.addChild(historyTabs);
                var socialHistoryTab = new ContentPane({id:"patientSocialHistoryTab",
                                                  title:"Social"
                                                  },
                                                  "patientSocialHistoryTab"
                                                  );
                historyTabs.addChild(socialHistoryTab);
                var familyHistoryTab = new ContentPane({id:"patientFamilyHistoryTab",
                                                  title:"Family"
                                                  },
                                                  "patientFamilyHistoryTab"
                                                  );
                historyTabs.addChild(familyHistoryTab);
                var medicalAndSurgicalHistoryTab = new ContentPane({id:"patientMedicalAndSurgicalHistoryTab",
                                                  title:"Medical & Surgical"
                                                  },
                                                  "patientMedicalAndSurgicalHistoryTab"
                                                  );
                historyTabs.addChild(medicalAndSurgicalHistoryTab);

//                 createButtons();
//                 fillData();
              //{% endif %}
          }

          function createButtons(){
                            //{% if perms.patient.add_patientfamilyhistory %}
                    var addPatientFamilyHistoryButton =  new Button({
                                                          label       : "Add",
                                                          title       : "Add Family History Details",
                                                          iconClass   : "dijitIconNewTask",
                                                          onClick: function(){
                                                                require(
                                                                  ["dojo/_base/xhr", "dojo/_base/array"],
                                                                  function(xhr, array){
                                                                    xhr.get({
                                                                      url: "{%url family_history_json %}"+
                                                                          "?patient_id="+
                                                                          dom.byId("selected_patient_id_info").innerHTML +
                                                                          "&action=add",
                                                                      load: function(html){
                                                                                var myDialog = dijit.byId("editPatientDialog");
                                                                                myDialog.set('content', html);
                                                                                myDialog.set('title', "Record New Family History Details");
                                                                                myDialog.show();
                                                                            }
                                                                  });
                                                                })
                                                          }
                                        },
                                        domConstruct.create('button',
                                                            {type : "button",
                                                            id   : "addPatientFamilyHistoryButton"
                                                            },
                                                            "family_history_list",
                                                            "before"
                                        )
                );


                //{% endif %}

                //{% if perms.patient.add_patientmedicalhistory %}
                    var addPatientMedicalHistoryButton =  new Button({
                                                          label       : "Add",
                                                          title       : "Add Medical History Details",
                                                          iconClass   : "dijitIconNewTask",
                                                          onClick: function(){
                                                                require(
                                                                  ["dojo/_base/xhr", "dojo/_base/array"],
                                                                  function(xhr, array){
                                                                    xhr.get({
                                                                      url: "{%url medical_history_json %}"+
                                                                          "?patient_id="+
                                                                          dom.byId("selected_patient_id_info").innerHTML +
                                                                          "&action=add",
                                                                      load: function(html){
                                                                                var myDialog = dijit.byId("editPatientDialog");
                                                                                myDialog.set('content', html);
                                                                                myDialog.set('title', "Record New Medical History Details");
                                                                                myDialog.show();
                                                                            }
                                                                  });
                                                                })
                                                          }
                                        },
                                        domConstruct.create('button',
                                                            {type : "button",
                                                            id   : "addPatientMedicalHistoryButton"
                                                            },
                                                            "medical_history_list",
                                                            "before"
                                        )
                );


                //{% endif %}

                //{% if perms.patient.add_patientsurgicalhistory %}
                    var addPatientSurgicalHistoryButton =  new Button({
                                                          label       : "Add",
                                                          title       : "Add Surgical History Details",
                                                          iconClass   : "dijitIconNewTask",
                                                          onClick: function(){
                                                                require(
                                                                  ["dojo/_base/xhr", "dojo/_base/array"],
                                                                  function(xhr, array){
                                                                    xhr.get({
                                                                      url: "{%url surgical_history_json %}"+
                                                                          "?patient_id="+
                                                                          dom.byId("selected_patient_id_info").innerHTML +
                                                                          "&action=add",
                                                                      load: function(html){
                                                                                var myDialog = dijit.byId("editPatientDialog");
                                                                                myDialog.set('content', html);
                                                                                myDialog.set('title', "Record New Surgical History Details");
                                                                                myDialog.show();
                                                                            }
                                                                  });
                                                                })
                                                          }
                                        },
                                        domConstruct.create('button',
                                                            {type : "button",
                                                            id   : "addPatientSurgicalHistoryButton"
                                                            },
                                                            "surgical_history_list",
                                                            "before"
                                        )
                );

                //{% endif %}

          }

          function fillData(){
            //{%if perms.patient.add_patientsocialhistory %}
              var socialHistoryUrl  = CHOSEN_PATIENT.socialhistoryadd;
              registry.byId("patientSocialHistoryTab").set('href', socialHistoryUrl);
            //{% endif %}

            //{%if perms.patient.add_patientfamilyhistory %}
              var familyHistoryUrl    = CHOSEN_PATIENT.familyhistoryjson;
              setupFamilyHistoryGrid(familyHistoryUrl);
            //{% endif %}

            //{% if perms.patient.add_patientmedicalhistory %}
              var medicalHistoryUrl   = CHOSEN_PATIENT.medicalhistoryjson;
              setupMedicalHistoryGrid(medicalHistoryUrl);
            //{% endif %}

            //{% if perms.patient.add_patientsurgicalhistory %}
              var surgicalHistoryUrl  = CHOSEN_PATIENT.surgicalhistoryjson;
              setupSurgicalHistoryGrid(surgicalHistoryUrl);
            //{% endif %}
          }

           createHistoryDoms();
           createHistoryDijits();
           createButtons();
           fillData();

    });
}
