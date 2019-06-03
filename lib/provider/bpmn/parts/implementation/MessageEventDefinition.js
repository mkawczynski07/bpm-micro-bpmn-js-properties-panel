'use strict';

var eventDefinitionReference = require('./EventDefinitionReference'),
    elementReferenceProperty = require('./ElementReferenceProperty'),
    entryFactory = require('../../../../factory/EntryFactory'),
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    utils = require('../../../../Utils'),
    cmdHelper = require('../../../../helper/CmdHelper');


module.exports = function(group, element, bpmnFactory, messageEventDefinition, elementRegistry, translate) {

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

  group.entries.push(entryFactory.validationAwareTextField({
    id: 'message-element-id',
    label: translate('Message id'),
    modelProperty: 'id',
    getProperty: function(element) {
      return getBusinessObject(element).id;
    },
    setProperty: function(element, properties) {

      element = element.labelTarget || element;

      return cmdHelper.updateProperties(element, properties);
    },
    validate: function(element, values) {
      var idValue = values.id;

      var bo = getBusinessObject(element);

      var idError = utils.isIdValid(bo, idValue, translate);

      return idError ? { id: idError } : {};
    }
  }));

};
