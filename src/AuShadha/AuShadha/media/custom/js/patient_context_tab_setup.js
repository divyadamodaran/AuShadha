function patientContextTabSetup(){
require(
  ["dijit/registry",
   "dojo/parser",
   "dijit/layout/TabContainer",
   "dojox/layout/ContentPane",
   "dojo/dom","dojo/dom-construct"
  ],
  function(registry,parser, TabContainer, ContentPane, dom, domConstruct){

    var mainContainer = registry.byId("patientContextContainer");

    domConstruct.create('div', {id: "patientContextTabs"}, 
                        "patientContextContainer", "first"
                        );

    domConstruct.create('div', {id: "patientContactTab"}, "patientContextTabs", "first");
      domConstruct.create('div', {id: "contact_list"}, "patientContactTab", "first");
      domConstruct.create('div', {id: "phone_list"}, "patientContactTab", "last");

    domConstruct.create('div', {id: "patientHistoryTab"}, "patientContextTabs", "second");
      domConstruct.create('div', {id: "patientDemographicsTab"}, "patientHistoryTab", "first");
        domConstruct.create('div', {id: "demographics_add_or_edit_form"}, "patientDemographicsTab", "first");
        domConstruct.create('div', {id: "guardian_list"}, "patientDemographicsTab", "last");
      domConstruct.create('div', {id: "patientSocialHistoryTab"}, "patientHistoryTab", "last");
      domConstruct.create('div', {id: "patientFamilyHistoryTab"}, "patientHistoryTab", "last");
        domConstruct.create('div', {id: "family_history_list"}, "patientFamilyHistoryTab", "first");
      domConstruct.create('div', {id: "patientMedicalAndSurgicalHistoryTab"}, "patientHistoryTab", "last");
        domConstruct.create('div', {id: "medical_and_surgical_history_list"}, "patientMedicalAndSurgicalHistoryTab", "first");

    domConstruct.create('div', {id: "patientPreventiveHealthTab"}, "patientContextTabs", "last");
        domConstruct.create('div', {id: "neonatal_and_paediatric_exam_list"}, "patientPreventiveHealthTab", "first");
        domConstruct.create('div', {id: "immunisation_list"}, "patientPreventiveHealthTab", "last");
        domConstruct.create('div', {id: "obstetrics_preventives_list"}, "patientPreventiveHealthTab", "last");
        domConstruct.create('div', {id: "gynaecology_preventives_list"}, "patientPreventiveHealthTab", "last");
        domConstruct.create('div', {id: "medical_preventives_list"}, "patientPreventiveHealthTab", "last");

    domConstruct.create('div', {id: "patientMedicationListAndAllergiesTab"}, "patientContextTabs", "last");
        domConstruct.create('div', {id: "medication_list"}, "patientMedicationListAndAllergiesTab", "first");
        domConstruct.create('div', {id: "allergy_list"}, "patientMedicationListAndAllergiesTab", "last");

    domConstruct.create('div', {id: "patientAdmissionAndVisitsTab"}, "patientContextTabs", "last");
        domConstruct.create('div', {id: "admission_list"}, "patientAdmissionAndVisitsTab", "first");
        domConstruct.create('div', {id: "visit_list"}, "patientAdmissionAndVisitsTab", "last");

    domConstruct.create('div', {id: "patientMediaTab"}, "patientContextTabs", "last");
        domConstruct.create('div', {id: "patient_media_list"}, "patientMediaTab", "first");

    var contextTabs = new TabContainer({ id: "patientContextTabs",
                                },
                                 "patientContextTabs"
                                );
    mainContainer.addChild(contextTabs);

    var contactTab = new ContentPane({id:"patientContactTab",
                                       title:"Contact"
                                      },
                                      "patientContactTab"
                                      );
    var historyTab = new ContentPane({id:"patientHistoryTab",
                                       title:"History"
                                      },
                                      "patientHistoryTab"
                                      );
    var preventiveHealthTab = new ContentPane({id:"patientPreventiveHealthTab",
                                       title:"Preventive Health"
                                      },
                                      "patientPreventiveHealthTab"
                                      );
    var medicationAndAllergiesTab = new ContentPane({id:"patientMedicationListAndAllergiesTab",
                                       title:"Medications & Allergies"
                                      },
                                      "patientMedicationListAndAllergiesTab"
                                      );
    var mediaTab = new ContentPane({id:"patientMediaTab",
                                       title:"Media"
                                      },
                                      "patientMediaTab"
                                      );

    tabs.addChild(contactTab);
    tabs.addChild(historyTab);
    tabs.addChild(preventiveHealthTab);
    tabs.addChild(medicationAndAllergiesTab);
    tabs.addChild(mediaTab);
    tabs.addChild(contactTab);

    mainContainer.startup();

    tabs.startup();

  }
);
}
