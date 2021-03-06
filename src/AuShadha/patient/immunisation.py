##--------------------------------------------------------------
# Views for Patient contact and details display and modification.
# Author: Dr.Easwar T.R , All Rights reserved with Dr.Easwar T.R.
# Date: 26-09-2010
##---------------------------------------------------------------

#import wx
import os, sys

# General Django Imports----------------------------------

from django.shortcuts                import render_to_response
from django.http                     import Http404, HttpResponse, HttpResponseRedirect
from django.template                 import RequestContext
#from django.core.context_processors import csrf
from django.contrib.auth.models      import User


from django.views.decorators.csrf   import csrf_exempt
from django.views.decorators.cache  import never_cache
from django.views.decorators.csrf   import csrf_protect
from django.views.decorators.debug  import sensitive_post_parameters

from django.core.paginator           import Paginator

from django.utils                    import simplejson
from django.core                     import serializers
from django.core.serializers         import json    
from django.core.serializers.json    import DjangoJSONEncoder

from django.contrib.auth.views       import login, logout
from django.contrib.auth.decorators  import login_required
from django.contrib.auth             import REDIRECT_FIELD_NAME
from django.contrib.auth.forms       import AuthenticationForm
from django.template.response        import TemplateResponse
from django.contrib.sites.models     import get_current_site
import urlparse

# General Module imports-----------------------------------
from datetime import datetime, date, time



# Application Specific Model Imports-----------------------
from patient.models   import *
from admission.models import *
#from discharge.models import *
#from visit.models     import *

import AuShadha.settings as settings

#Views start here -----------------------------------------

from patient.views import *

################################################################################

@login_required
def patient_immunisation_add(request,id):
  if request.user:
    user = request.user
    if request.method =="GET" and request.is_ajax():
      try:
        id                      = int(id)
        patient_detail_obj      = PatientDetail.objects.get(pk =id)
        patient_immunisation_obj       = PatientImmunisation(patient_detail = patient_detail_obj)
        patient_immunisation_add_form  = PatientImmunisationForm(instance = patient_immunisation_obj)
        variable                = RequestContext(request, 
        																					{"user" 									:	user,
        																					 "patient_detail_obj"			:	patient_detail_obj ,
        																					 "patient_immunisation_add_form" :	patient_immunisation_add_form, 
																									 "patient_immunisation_obj" 		  :	patient_immunisation_obj ,
																									})
#      except TypeError or ValueError or AttributeError:
#        raise Http404("BadRequest")
      except PatientDetail.DoesNotExist:
        raise Http404("BadRequest: Patient Data Does Not Exist")
      return render_to_response('patient/immunisation/add.html',variable)
    elif request.method == 'POST' and request.is_ajax():
      try:
        id                      = int(id)
        patient_detail_obj      = PatientDetail.objects.get(pk =id)
        patient_immunisation_obj       = PatientImmunisation(patient_detail = patient_detail_obj, administrator = user)
        patient_immunisation_add_form  = PatientImmunisationForm(request.POST,instance = patient_immunisation_obj)
        if patient_immunisation_add_form.is_valid():
          immunisation_obj          = patient_immunisation_add_form.save()
          success        = True
          error_message  = "Immunisation Data Added Successfully"
          addData        = {
                            "id"                : immunisation_obj.id,
                            "vaccine_detail"      : immunisation_obj.vaccine_detail.vaccine_name,
                            "vaccination_date"  : immunisation_obj.vaccination_date.isoformat(),
                            "next_due"          : immunisation_obj.next_due.isoformat(),
                            "route"             : immunisation_obj.route,
                            "injection_site"    : immunisation_obj.injection_site,
                            "dose"              : immunisation_obj.dose,
                            "administrator"     : immunisation_obj.administrator.__unicode__(),
                            "adverse_reaction"  : immunisation_obj.adverse_reaction,
                            "edit"              : immunisation_obj.get_edit_url(),
                            "del"               : immunisation_obj.get_del_url()
          }
          data           = {'success'      : success, 
                            'error_message': error_message,
                            "form_errors"  : None,
                            "addData"      : addData
          }
          json           = simplejson.dumps(data)
          return HttpResponse(json, content_type = 'application/json')
        else:
          success       = False
          error_message = "Error Occured. Immunisation data could not be added."
          form_errors   = ''
          for error in patient_immunisation_add_form.errors:
            form_errors += '<p>' + error +'</p>'
          data = { 'success'      : success, 
                   'error_message': error_message,
                   'form_errors'  : form_errors
                 }
          json = simplejson.dumps(data)
          return HttpResponse(json, content_type = 'application/json')
      except ValueError or AttributeError or TypeError:
        raise Http404("BadRequest: Server Error")
      except PatientDetail.DoesNotExist:
        raise Http404("BadRequest: Requested Patient DoesNotExist")
    else:
      raise Http404("BadRequest: Unsupported Request Method. AJAX status is:: " + unicode(request.is_ajax()))
  else:
    raise Http404("You need to Login")

@login_required
def patient_immunisation_edit(request,id):
  if request.user:
    user = request.user
    if request.method =="GET" and request.is_ajax():
      try:
        id                            = int(id)
        patient_immunisation_obj         = PatientImmunisation.objects.get(pk = id)
        patient_immunisation_edit_form   = PatientImmunisationForm(instance = patient_immunisation_obj)
        variable                      = RequestContext(request, 
        																					{"user" 									      :	user,
        																					 "patient_detail_obj"			      :	patient_immunisation_obj.patient_detail ,
        																					 "patient_immunisation_edit_form"  :	patient_immunisation_edit_form, 
																									 "patient_immunisation_obj" 		    :	patient_immunisation_obj ,
																									})
      except TypeError or ValueError or AttributeError:
        raise Http404("BadRequest")
      except PatientImmunisation.DoesNotExist:
        raise Http404("BadRequest: Patient Data Does Not Exist")
      return render_to_response('patient/immunisation/edit.html',variable)
    elif request.method == 'POST' and request.is_ajax():
      try:
        id                            = int(id)
        patient_immunisation_obj         = PatientImmunisation.objects.get(pk = id)
        patient_immunisation_edit_form   = PatientImmunisationForm(request.POST,instance = patient_immunisation_obj)
        if patient_immunisation_edit_form.is_valid():
          immunisation_obj           = patient_immunisation_edit_form.save()
          success                 = True
          error_message           = "Immunisation Data Edited Successfully"
          addData        = {
                            "id"                : immunisation_obj.id,
                            "vaccine_detail"      : immunisation_obj.vaccine_detail.vaccine_name,
                            "vaccination_date"  : immunisation_obj.vaccination_date.isoformat(),
                            "next_due"          : immunisation_obj.next_due.isoformat(),
                            "route"             : immunisation_obj.route,
                            "injection_site"    : immunisation_obj.injection_site,
                            "dose"              : immunisation_obj.dose,
                            "administrator"     : immunisation_obj.administrator.__unicode__(),
                            "adverse_reaction"  : immunisation_obj.adverse_reaction,
                            "edit"              : immunisation_obj.get_edit_url(),
                            "del"               : immunisation_obj.get_del_url()
          }
          data                    = {
                                    'success'      : success, 
                                    'error_message': error_message,
                                    "form_errors"  : None,
                                    "addData"      : addData
                                    }
          json           = simplejson.dumps(data)
          return HttpResponse(json, content_type = 'application/json')
        else:
          success       = False
          error_message = "Error Occured. Immunisation data could not be added."
          form_errors   = ''
          for error in patient_immunisation_edit_form.errors:
            form_errors += '<p>' + error +'</p>'
          data = { 'success'      : success, 
                   'error_message': error_message,
                   'form_errors'  : form_errors
                 }
          json = simplejson.dumps(data)
          return HttpResponse(json, content_type = 'application/json')
      except ValueError or AttributeError or TypeError:
        raise Http404("BadRequest: Server Error")
      except PatientDetail.DoesNotExist:
        raise Http404("BadRequest: Requested Patient DoesNotExist")
    else:
      raise Http404("BadRequest: Unsupported Request Method. AJAX status is:: " + unicode(request.is_ajax()))
  else:
    raise Http404("You need to Login")

@login_required
def patient_immunisation_del(request,id):
  user = request.user
  if request.user and user.is_superuser:
    if request.method =="GET":
       try:
          id                       = int(id)
          patient_immunisation_obj = PatientImmunisation.objects.get(pk = id)
          patient_detail_obj       = patient_immunisation_obj.patient_detail
       except TypeError or ValueError or AttributeError:
          raise Http404("BadRequest")
       except PatientImmunisation.DoesNotExist:
          raise Http404("BadRequest: Patient immunisation Data Does Not Exist")
       patient_immunisation_obj.delete()
       success        = True
       error_message  = "immunisation Data Deleted Successfully"
       data           = {'success': success, 'error_message': error_message}
       json           = simplejson.dumps(data)
       return HttpResponse(json, content_type = 'application/json')
    else:
      raise Http404("BadRequest: Unsupported Request Method")
  else:
    raise Http404("Server Error: No Permission to delete.")

