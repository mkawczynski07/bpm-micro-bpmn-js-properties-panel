'use strict';

var eventDefinitionReference = require('./EventDefinitionReference'),
    elementReferenceProperty = require('./ElementReferenceProperty'),
    entryFactory = require('../../../../factory/EntryFactory'),
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    utils = require('../../../../Utils'),
    cmdHelper = require('../../../../helper/CmdHelper');


module.exports = function(group, element, bpmnFactory, messageEventDefinition, translate) {

  group.entries = group.entries.concat(eventDefinitionReference(element, messageEventDefinition, bpmnFactory, {
    label: translate('Message'),
    elementName: 'message',
    elementType: 'bpmn:Message',
    referenceProperty: 'messageRef',
    newElementIdPrefix: 'Message_'
  }));


  group.entries = group.entries.concat(elementReferenceProperty(element, messageEventDefinition, bpmnFactory, {
    id: 'message-element-name',
    label: translate('Message Name'),
    referenceProperty: 'messageRef',
    modelProperty: 'name',
    shouldValidate: true
  }));

  group.entries = group.entries.concat(elementReferenceProperty(element, messageEventDefinition, bpmnFactory, {
    id: 'message-element-id',
    label: translate('Message Id'),
    referenceProperty: 'messageRef',
    modelProperty: 'id',
    shouldValidate: true
  }));

};
