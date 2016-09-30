/*!
 * jQuery Validation Plugin v1.15.1-pre
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */
define(function (require, exports, module) {
    var jQuery = $ = require('jquery');
    module.exports = {}
        + function ($) {
            $.extend($.fn, {

                // http://jqueryvalidation.org/validate/
                validate: function (options) {

                    // 没有具体验证form
                    if (!this.length) {
                        if (options && options.debug && window.console) {
                            console.warn("Nothing selected, can't validate, returning nothing.");
                        }
                        return;
                    }

                    // 判断是否已经创建验证实例
                    var validator = $.data(this[0], "validator");
                    if (validator) {
                        return validator;
                    }

                    // html5不对输入验证
                    this.attr("novalidate", "novalidate");
                    validator = new $.validator(options, this[0]);
                    $.data(this[0], "validator", validator);

                    if (validator.settings.onsubmit) {

                        this.on("click.validate", ":submit", function (event) {
                            if (validator.settings.submitHandler) {
                                validator.submitButton = event.target;
                            }

                            // Allow suppressing validation by adding a cancel class to the submit button
                            if ($(this).hasClass("cancel")) {
                                validator.cancelSubmit = true;
                            }

                            // Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                            if ($(this).attr("formnovalidate") !== undefined) {
                                validator.cancelSubmit = true;
                            }
                        });

                        // Validate the form on submit
                        this.on("submit.validate", function (event) {
                            if (validator.settings.debug) {
                                // Prevent form submit to be able to see console output
                                event.preventDefault();
                            }
                            function handle() {
                                var hidden, result;
                                if (validator.settings.submitHandler) {
                                    if (validator.submitButton) {

                                        // Insert a hidden input as a replacement for the missing submit button
                                        hidden = $("<input type='hidden'/>")
                                            .attr("name", validator.submitButton.name)
                                            .val($(validator.submitButton).val())
                                            .appendTo(validator.currentForm);
                                    }
                                    result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
                                    if (validator.submitButton) {

                                        // And clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                        hidden.remove();
                                    }
                                    if (result !== undefined) {
                                        return result;
                                    }
                                    return false;
                                }
                                return true;
                            }

                            // Prevent submit for invalid forms or custom submit handlers
                            if (validator.cancelSubmit) {
                                validator.cancelSubmit = false;
                                return handle();
                            }
                            if (validator.form()) {
                                if (validator.pendingRequest) {
                                    validator.formSubmitted = true;
                                    return false;
                                }
                                return handle();
                            } else {
                                validator.focusInvalid();
                                return false;
                            }
                        });
                    }

                    return validator;
                },
                // http://jqueryvalidation.org/valid/
                valid: function () {
                    var valid, validator, errorList;

                    if ($(this[0]).is("form")) {
                        valid = this.validate().form();
                    } else {
                        errorList = [];
                        valid = true;
                        validator = $(this[0].form).validate();
                        this.each(function () {
                            valid = validator.element(this) && valid;
                            if (!valid) {
                                errorList = errorList.concat(validator.errorList);
                            }
                        });
                        validator.errorList = errorList;
                    }
                    return valid;
                },

                // http://jqueryvalidation.org/rules/
                rules: function (command, argument) {

                    // If nothing is selected, return nothing; can't chain anyway
                    if (!this.length) {
                        return;
                    }

                    var element = this[0],
                        settings, staticRules, existingRules, data, param, filtered;

                    if (command) {
                        settings = $.data(element.form, "validator").settings;
                        staticRules = settings.rules;
                        existingRules = $.validator.staticRules(element);
                        switch (command) {
                            case "add":
                                $.extend(existingRules, $.validator.normalizeRule(argument));

                                // Remove messages from rules, but allow them to be set separately
                                delete existingRules.messages;
                                staticRules[element.id] = existingRules;
                                if (argument.messages) {
                                    settings.messages[element.id] = $.extend(settings.messages[element.id], argument.messages);
                                }
                                break;
                            case "remove":
                                if (!argument) {
                                    delete staticRules[element.id];
                                    return existingRules;
                                }
                                filtered = {};
                                $.each(argument.split(/\s/), function (index, method) {
                                    filtered[method] = existingRules[method];
                                    delete existingRules[method];
                                    if (method === "required") {
                                        $(element).removeAttr("aria-required");
                                    }
                                });
                                return filtered;
                        }
                    }

                    data = $.validator.normalizeRules(
                        $.extend(
                            {},
                            $.validator.classRules(element),
                            //   $.validator.attributeRules(element),
                            //   $.validator.dataRules(element),
                            $.validator.staticRules(element)
                        ), element);

                    // Make sure required is at front
                    if (data.required) {
                        param = data.required;
                        delete data.required;
                        data = $.extend({required: param}, data);
                        $(element).attr("aria-required", "true");
                    }

                    // Make sure remote is at back
                    if (data.remote) {
                        param = data.remote;
                        delete data.remote;
                        data = $.extend(data, {remote: param});
                    }

                    return data;
                }
            });

            // Custom selectors
            $.extend($.expr[":"], {
                // http://jqueryvalidation.org/blank-selector/
                blank: function (a) {
                    return !$.trim("" + $(a).val());
                },
                // http://jqueryvalidation.org/filled-selector/
                filled: function (a) {
                    var val = $(a).val();
                    return val !== null && !!$.trim("" + val);
                },
                // http://jqueryvalidation.org/unchecked-selector/
                unchecked: function (a) {
                    return !$(a).prop("checked");
                }
            });
            // 验证构造函数
            $.validator = function (options, form) {
                this.settings = $.extend(true, {}, $.validator.defaults, options);
                this.currentForm = form;
                this.init();
            };
            // http://jqueryvalidation.org/jQuery.validator.format/
            $.validator.format = function (source, params) {
                if (arguments.length === 1) {
                    return function () {
                        var args = $.makeArray(arguments);
                        args.unshift(source);
                        return $.validator.format.apply(this, args);
                    };
                }
                if (params === undefined) {
                    return source;
                }
                if (arguments.length > 2 && params.constructor !== Array) {
                    params = $.makeArray(arguments).slice(1);
                }
                if (params.constructor !== Array) {
                    params = [params];
                }
                $.each(params, function (i, n) {
                    source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                        return n;
                    });
                });
                return source;
            };

            $.extend($.validator, {
                defaults: {
                    messages: {},
                    groups: {},
                    rules: {},
                    errorClass: "error",
                    pendingClass: "pending",
                    validClass: "valid",
                    errorElement: "label",
                    focusCleanup: false,
                    focusInvalid: true,
                    errorContainer: $([]),
                    errorLabelContainer: $([]),
                    onsubmit: true,
                    ignore: ":hidden",
                    ignoreTitle: false,
                    onfocusin: function (element) {
                        this.lastActive = element;
                        // Hide error label and remove error class on focus if enabled
                        if (this.settings.focusCleanup) {
                            if (this.settings.unhighlight) {
                                this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                            }
                            this.hideThese(this.errorsFor(element));
                        }
                    },
                    onfocusout: function (element) {
                        if (!this.checkable(element) && (element.id in this.submitted || !this.optional(element))) {
                            this.element(element);
                        }
                    },
                    onkeyup: function (element, event) {

                        // Avoid revalidate the field when pressing one of the following keys
                        // Shift       => 16
                        // Ctrl        => 17
                        // Alt         => 18
                        // Caps lock   => 20
                        // End         => 35
                        // Home        => 36
                        // Left arrow  => 37
                        // Up arrow    => 38
                        // Right arrow => 39
                        // Down arrow  => 40
                        // Insert      => 45
                        // Num lock    => 144
                        // AltGr key   => 225
                        var excludedKeys = [
                            16, 17, 18, 20, 35, 36, 37,
                            38, 39, 40, 45, 144, 225
                        ];

                        if (event.which === 9 && this.elementValue(element) === "" || $.inArray(event.keyCode, excludedKeys) !== -1) {
                            return;
                        } else if (element.id in this.submitted || element.id in this.invalid || element.id == this.hiddenInput) {
                            this.element(element);
                        }
                    },
                    onchange: function (element, event) {
                        if (!this.checkable(element) && (element.id in this.submitted || !this.optional(element))) {
                            this.element(element);
                        }
                    },
                    onclick: function (element) {

                        // Click on selects, radiobuttons and checkboxes
                        if (element.id in this.submitted) {
                            this.element(element);

                            // Or option elements, check parent select in that case
                        } else if (element.parentNode.id in this.submitted) {
                            this.element(element.parentNode);
                        }
                    },
                    highlight: function (element, errorClass, validClass) {
                        if (element.type === "radio") {
                            this.findByName(element.id).addClass(errorClass).removeClass(validClass);
                        } else {
                            $(element).addClass(errorClass).removeClass(validClass);
                        }
                    },
                    unhighlight: function (element, errorClass, validClass) {
                        if (element.type === "radio") {
                            this.findByName(element.id).removeClass(errorClass).addClass(validClass);
                        } else {
                            $(element).removeClass(errorClass).addClass(validClass);
                        }
                    }
                },

                //设置默认值
                setDefaults: function (settings) {
                    $.extend($.validator.defaults, settings);
                },


                messages: {
                    required: "This field is required.",
                    remote: "Please fix this field.",
                    email: "Please enter a valid email address.",
                    url: "Please enter a valid URL.",
                    date: "Please enter a valid date.",
                    dateISO: "Please enter a valid date (ISO).",
                    number: "Please enter a valid number.",
                    digits: "Please enter only digits.",
                    equalTo: "Please enter the same value again.",
                    maxlength: $.validator.format("Please enter no more than {0} characters."),
                    minlength: $.validator.format("Please enter at least {0} characters."),
                    rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
                    range: $.validator.format("Please enter a value between {0} and {1}."),
                    max: $.validator.format("Please enter a value less than or equal to {0}."),
                    min: $.validator.format("Please enter a value greater than or equal to {0}."),
                    step: $.validator.format("Please enter a multiple of {0}.")
                },

                autoCreateRanges: false,

                prototype: {

                    init: function () {
                        this.labelContainer = $(this.settings.errorLabelContainer);
                        this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                        this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                        this.submitted = {};
                        this.hiddenInput = this.settings.hiddenInput;
                        this.valueCache = {};
                        this.pendingRequest = 0;
                        this.pending = {};
                        this.invalid = {};
                        this.reset();

                        var groups = ( this.groups = {} ),
                            rules;
                        $.each(this.settings.groups, function (key, value) {
                            if (typeof value === "string") {
                                value = value.split(/\s/);
                            }
                            $.each(value, function (index, name) {
                                groups[name] = key;
                            });
                        });
                        rules = this.settings.rules;
                        $.each(rules, function (key, value) {
                            rules[key] = $.validator.normalizeRule(value);
                        });

                        //事件委托
                        function delegate(event) {
                            var validator = $.data(this.form, "validator"),
                                eventType = "on" + event.type.replace(/^validate/, ""),
                                settings = validator.settings;
                            if (settings[eventType] && !$(this).is(settings.ignore)) {
                                settings[eventType].call(validator, this, event);
                            }
                        }

                        $(this.currentForm)
                            .on("focusin.validate focusout.validate keyup.validate focusout",
                                ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
                                "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
                                "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
                                "[type='radio'], [type='checkbox'], [contenteditable]", delegate)

                            // Support: Chrome, oldIE
                            // "select" is provided as event.target when clicking a option
                            .on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);

                        if (this.settings.invalidHandler) {
                            $(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                        }

                        // Add aria-required to any Static/Data/Class required fields before first validation
                        // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
                        $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
                    },

                    // http://jqueryvalidation.org/Validator.form/
                    form: function () {
                        this.checkForm();
                        $.extend(this.submitted, this.errorMap);
                        this.invalid = $.extend({}, this.errorMap);
                        if (!this.valid()) {
                            $(this.currentForm).triggerHandler("invalid-form", [this]);
                        }
                        this.showErrors();
                        return this.valid();
                    },

                    checkForm: function () {
                        this.prepareForm();
                        for (var i = 0, elements = ( this.currentElements = this.elements() ); elements[i]; i++) {
                            this.check(elements[i]);
                        }
                        return this.valid();
                    },

                    // http://jqueryvalidation.org/Validator.element/
                    element: function (element) {
                        var cleanElement = this.clean(element),
                            checkElement = this.validationTargetFor(cleanElement),
                            v = this,
                            result = true,
                            rs, group;

                        if (checkElement === undefined) {
                            delete this.invalid[cleanElement.id];
                        } else {
                            this.prepareElement(checkElement);
                            this.currentElements = $(checkElement);
                            // If this element is grouped, then validate all group elements already
                            // containing a value
                            group = this.groups[checkElement.id];
                            if (group) {
                                $.each(this.groups, function (name, testgroup) {
                                    if (testgroup === group && name !== checkElement.id) {
                                        cleanElement = v.validationTargetFor(v.clean(v.findByName(name)));
                                        if (cleanElement && cleanElement.id in v.invalid) {
                                            v.currentElements.push(cleanElement);
                                            result = result && v.check(cleanElement);
                                        }
                                    }
                                });
                            }

                            rs = this.check(checkElement) !== false;
                            result = result && rs;
                            if (rs) {
                                this.invalid[checkElement.id] = false;
                            } else {
                                this.invalid[checkElement.id] = true;
                            }

                            if (!this.numberOfInvalids()) {

                                // Hide error containers on last error
                                this.toHide = this.toHide.add(this.containers);
                            }
                            this.showErrors();

                            // Add aria-invalid status for screen readers
                            $(element).attr("aria-invalid", !rs);
                        }

                        return result;
                    },

                    // http://jqueryvalidation.org/Validator.showErrors/
                    showErrors: function (errors) {
                        if (errors) {
                            var validator = this;

                            // Add items to error list and map
                            $.extend(this.errorMap, errors);
                            this.errorList = $.map(this.errorMap, function (message, name) {
                                return {
                                    message: message,
                                    element: validator.findByName(name)[0]
                                };
                            });

                            // Remove items from success list
                            this.successList = $.grep(this.successList, function (element) {
                                return !( element.id in errors );
                            });
                        }
                        if (this.settings.showErrors) {
                            this.settings.showErrors.call(this, this.errorMap, this.errorList);
                        } else {
                            this.defaultShowErrors();
                        }
                    },

                    // http://jqueryvalidation.org/Validator.resetForm/
                    resetForm: function () {
                        if ($.fn.resetForm) {
                            $(this.currentForm).resetForm();
                        }
                        this.invalid = {};
                        this.submitted = {};
                        this.prepareForm();
                        this.hideErrors();
                        var elements = this.elements()
                            .removeData("previousValue")
                            .removeAttr("aria-invalid");
                        this.resetElements(elements);
                    },

                    resetElements: function (elements) {
                        var i;

                        if (this.settings.unhighlight) {
                            for (i = 0; elements[i]; i++) {
                                this.settings.unhighlight.call(this, elements[i],
                                    this.settings.errorClass, "");
                                this.findByName(elements[i].name).removeClass(this.settings.validClass);
                            }
                        } else {
                            elements
                                .removeClass(this.settings.errorClass)
                                .removeClass(this.settings.validClass);
                        }
                    },

                    numberOfInvalids: function () {
                        return this.objectLength(this.invalid);
                    },

                    objectLength: function (obj) {
                        /* jshint unused: false */
                        var count = 0,
                            i;
                        for (i in obj) {
                            if (obj[i]) {
                                count++;
                            }
                        }
                        return count;
                    },

                    hideErrors: function () {
                        this.hideThese(this.toHide);
                    },

                    hideThese: function (errors) {
                        errors.not(this.containers).text("");
                        this.addWrapper(errors).hide();
                    },

                    valid: function () {
                        if (!this.size()) {
                            $(this.currentForm).find(".fake-pwd").remove();
                        }
                        return this.size() === 0;
                    },

                    size: function () {
                        return this.errorList.length;
                    },

                    focusInvalid: function () {
                        if (this.settings.focusInvalid) {
                            try {
                                $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                                    .filter(":visible")
                                    .focus()

                                    // Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                                    .trigger("focusin");
                            } catch (e) {

                                // Ignore IE throwing errors when focusing hidden elements
                            }
                        }
                    },

                    findLastActive: function () {
                        var lastActive = this.lastActive;
                        return lastActive && $.grep(this.errorList, function (n) {
                                return n.element.id === lastActive.id;
                            }).length === 1 && lastActive;
                    },

                    elements: function () {
                        var validator = this,
                            rulesCache = {};

                        // Select all valid inputs inside the form (no submit or reset buttons)
                        var rules = $(this.currentForm)
                            .find("input, select, textarea, [contenteditable]")
                            .not(":submit, :reset, :image, :disabled")
                            .not(this.settings.ignore)
                            .filter(function () {
                                var id = this.id || $(this).attr("id"); // For contenteditable
                                if (!id && validator.settings.debug && window.console) {
                                    console.error("%o has no name assigned", this);
                                }
                                if (!this.id) {
                                    return false;
                                }
                                // Set form expando on contenteditable
                                if (this.hasAttribute("contenteditable")) {
                                    this.form = $(this).closest("form")[0];
                                }

                                // Select only the first element for each name, and only those with rules specified
                                if (id in rulesCache || !validator.objectLength($(this).rules())) {
                                    return false;
                                }

                                rulesCache[this.id] = true;
                                return true;
                            });
                        return rules;
                    },

                    clean: function (selector) {
                        return $(selector)[0];
                    },

                    errors: function () {
                        var errorClass = this.settings.errorClass.split(" ").join(".");
                        return $(this.settings.errorElement + "." + errorClass, this.errorContext);
                    },
                    resetInternals: function () {
                        this.successList = [];
                        this.errorList = [];
                        this.errorMap = {};
                        this.toShow = $([]);
                        this.toHide = $([]);
                    },
                    reset: function () {
                        this.resetInternals();
                        this.currentElements = $([]);
                    },

                    prepareForm: function () {
                        this.reset();
                        this.toHide = this.errors().add(this.containers);
                    },

                    prepareElement: function (element) {
                        this.reset();
                        this.toHide = this.errorsFor(element);
                    },

                    elementValue: function (element) {
                        var $element = $(element),
                            type = element.type,
                            val, idx;

                        if (type === "radio" || type === "checkbox") {
                            return this.findByName(element.id).filter(":checked").val();
                        } else if (type === "number" && typeof element.validity !== "undefined") {
                            return element.validity.badInput ? "NaN" : $element.val();
                        }

                        if (element.hasAttribute("contenteditable")) {
                            val = $element.text();
                        } else {
                            val = $element.val();
                        }

                        if (type === "file") {

                            // Modern browser (chrome & safari)
                            if (val.substr(0, 12) === "C:\\fakepath\\") {
                                return val.substr(12);
                            }

                            // Legacy browsers
                            // Unix-based path
                            idx = val.lastIndexOf("/");
                            if (idx >= 0) {
                                return val.substr(idx + 1);
                            }

                            // Windows-based path
                            idx = val.lastIndexOf("\\");
                            if (idx >= 0) {
                                return val.substr(idx + 1);
                            }

                            // Just the file name
                            return val;
                        }

                        if (typeof val === "string") {
                            return val.replace(/\r/g, "");
                        }
                        return val;
                    },

                    check: function (element) {
                        element = this.validationTargetFor(this.clean(element));

                        var rules = $(element).rules(),
                            rulesCount = $.map(rules, function (n, i) {
                                return i;
                            }).length,
                            dependencyMismatch = false,
                            val = this.elementValue(element),
                            result, method, rule;

                        // If a normalizer is defined for this element, then
                        // call it to retreive the changed value instead
                        // of using the real one.
                        // Note that `this` in the normalizer is `element`.
                        if (typeof rules.normalizer === "function") {
                            val = rules.normalizer.call(element, val);

                            if (typeof val !== "string") {
                                throw new TypeError("The normalizer should return a string value.");
                            }

                            // Delete the normalizer from rules to avoid treating
                            // it as a pre-defined method.
                            delete rules.normalizer;
                        }

                        for (method in rules) {
                            rule = {method: method, parameters: rules[method]};
                            try {
                                result = $.validator.methods[method].call(this, val, element, rule.parameters);

                                // If a method indicates that the field is optional and therefore valid,
                                // don't mark it as valid when there are no other rules
                                if (result === "dependency-mismatch" && rulesCount === 1) {
                                    dependencyMismatch = true;
                                    continue;
                                }
                                dependencyMismatch = false;

                                if (result === "pending") {
                                    this.toHide = this.toHide.not(this.errorsFor(element));
                                    return;
                                }

                                if (!result) {
                                    this.formatAndAdd(element, rule);
                                    return false;
                                }
                            } catch (e) {
                                if (this.settings.debug && window.console) {
                                    console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                                }
                                if (e instanceof TypeError) {
                                    e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                                }

                                throw e;
                            }
                        }
                        if (dependencyMismatch) {
                            // return;
                        }
                        if (this.objectLength(rules)) {
                            this.successList.push(element);
                        }
                        return true;
                    },

                    // Return the custom message for the given element and validation method
                    // specified in the element's HTML5 data attribute
                    // return the generic message if present and no method specific message is present
                    customDataMessage: function (element, method) {
                        return $(element).data("msg" + method.charAt(0).toUpperCase() +
                                method.substring(1).toLowerCase()) || $(element).data("msg");
                    },

                    // Return the custom message for the given element name and validation method
                    customMessage: function (name, method) {
                        var m = this.settings.messages[name];
                        return m && ( m.constructor === String ? m : m[method] );
                    },

                    // Return the first defined argument, allowing empty strings
                    findDefined: function () {
                        for (var i = 0; i < arguments.length; i++) {
                            if (arguments[i] !== undefined) {
                                return arguments[i];
                            }
                        }
                        return undefined;
                    },

                    defaultMessage: function (element, rule) {
                        var message = this.findDefined(
                            this.customMessage(element.id, rule.method),
                            this.customDataMessage(element, rule.method),

                            // 'title' is never undefined, so handle empty string as undefined
                                !this.settings.ignoreTitle && element.title || undefined,
                            $.validator.messages[rule.method],
                                "<strong>Warning: No message defined for " + element.id + "</strong>"
                            ),
                            theregex = /\$?\{(\d+)\}/g;
                        if (typeof message === "function") {
                            message = message.call(this, rule.parameters, element);
                        } else if (theregex.test(message)) {
                            message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                        }

                        return message;
                    },

                    formatAndAdd: function (element, rule) {
                        var message = this.defaultMessage(element, rule);

                        this.errorList.push({
                            message: message,
                            element: element,
                            method: rule.method
                        });

                        this.errorMap[element.id] = message;
                        this.submitted[element.id] = message;
                    },

                    addWrapper: function (toToggle) {
                        if (this.settings.wrapper) {
                            toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
                        }
                        return toToggle;
                    },

                    defaultShowErrors: function () {
                        var i, elements, error;
                        for (i = 0; this.errorList[i]; i++) {
                            error = this.errorList[i];
                            if (this.settings.highlight) {
                                this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                            }
                            this.showLabel(error.element, error.message);
                        }
                        if (this.errorList.length) {
                            this.toShow = this.toShow.add(this.containers);
                        }
                        if (this.settings.success) {
                            for (i = 0; this.successList[i]; i++) {
                                this.showLabel(this.successList[i]);
                            }
                        }
                        if (this.settings.unhighlight) {
                            for (i = 0, elements = this.validElements(); elements[i]; i++) {
                                this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                            }
                        }
                        this.toHide = this.toHide.not(this.toShow);
                        this.hideErrors();
                        this.addWrapper(this.toShow).show();
                    },

                    validElements: function () {
                        return this.currentElements.not(this.invalidElements());
                    },

                    invalidElements: function () {
                        return $(this.errorList).map(function () {
                            return this.element;
                        });
                    },

                    showLabel: function (element, message) {
                        var place, group, errorID, v,
                            error = this.errorsFor(element),
                            elementID = this.idOrName(element),
                            describedBy = $(element).attr("aria-describedby");
                        if (error.length) {
                            // refresh error/success class
                            error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                            // replace message on existing label
                            error.html(message);
                        } else {
                            // create error element
                            error = $("<" + this.settings.errorElement + ">")
                                .attr("id", elementID + "-error")
                                .addClass(this.settings.errorClass)
                                .html(message || "");

                            // Maintain reference to the element to be placed into the DOM
                            place = error;
                            if (this.settings.wrapper) {
                                // make sure the element is visible, even in IE
                                // actually showing the wrapped element is handled elsewhere
                                place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                            }
                            if (this.labelContainer.length) {
                                this.labelContainer.append(place);
                            } else if (this.settings.errorPlacement) {
                                this.settings.errorPlacement(place, $(element));
                            } else {
                                place.insertAfter(element);
                            }

                            // Link error back to the element
                            if (error.is("label")) {

                                // If the error is a label, then associate using 'for'
                                error.attr("for", elementID);

                                // If the element is not a child of an associated label, then it's necessary
                                // to explicitly apply aria-describedby
                            } else if (error.parents("label[for='" + this.escapeCssMeta(elementID) + "']").length === 0) {
                                errorID = error.attr("id");

                                // Respect existing non-error aria-describedby
                                if (!describedBy) {
                                    describedBy = errorID;
                                } else if (!describedBy.match(new RegExp("\\b" + this.escapeCssMeta(errorID) + "\\b"))) {

                                    // Add to end of list if not already present
                                    describedBy += " " + errorID;
                                }
                                $(element).attr("aria-describedby", describedBy);

                                // If this element is grouped, then assign to all elements in the same group
                                group = this.groups[element.id];
                                if (group) {
                                    v = this;
                                    $.each(v.groups, function (name, testgroup) {
                                        if (testgroup === group) {
                                            $("[name='" + v.escapeCssMeta(name) + "']", v.currentForm)
                                                .attr("aria-describedby", error.attr("id"));
                                        }
                                    });
                                }
                            }
                        }
                        if (!message && this.settings.success) {
                            error.text("");
                            if (typeof this.settings.success === "string") {
                                error.addClass(this.settings.success);
                            } else {
                                this.settings.success(error, element);
                            }
                        }
                        this.toShow = this.toShow.add(error);
                    },

                    errorsFor: function (element) {
                        var name = this.escapeCssMeta(this.idOrName(element)),
                            describer = $(element).attr("aria-describedby"),
                            selector = "label[for='" + name + "'], label[for='" + name + "'] *";

                        // 'aria-describedby' should directly reference the error element
                        if (describer) {
                            selector = selector + ", #" + this.escapeCssMeta(describer)
                                    .replace(/\s+/g, ", #");
                        }
                        return this
                            .errors()
                            .filter(selector);
                    },
                    // See https://api.jquery.com/category/selectors/, for CSS
                    // meta-characters that should be escaped in order to be used with JQuery
                    // as a literal part of a name/id or any selector.
                    escapeCssMeta: function (string) {
                        return string.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
                    },
                    idOrName: function (element) {
                        return this.groups[element.id] || ( this.checkable(element) ? element.id : element.id || element.id );
                    },

                    validationTargetFor: function (element) {

                        // If radio/checkbox, validate first element in group instead
                        if (this.checkable(element)) {
                            element = this.findByName(element.id);
                        }

                        // Always apply ignore filter
                        return $(element).not(this.settings.ignore)[0];
                    },

                    checkable: function (element) {
                        return ( /radio|checkbox/i ).test(element.type);
                    },

                    findByName: function (name) {
                        return $(this.currentForm).find("[id='" + this.escapeCssMeta(name) + "']");
                    },

                    getLength: function (value, element) {
                        switch (element.nodeName.toLowerCase()) {
                            case "select":
                                return $("option:selected", element).length;
                            case "input":
                                if (this.checkable(element)) {
                                    return this.findByName(element.id).filter(":checked").length;
                                }
                        }
                        return value.length;
                    },

                    depend: function (param, element) {
                        return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
                    },

                    dependTypes: {
                        "boolean": function (param) {
                            return param;
                        },
                        "string": function (param, element) {
                            return !!$(param, element.form).length;
                        },
                        "function": function (param, element) {
                            return param(element);
                        }
                    },

                    optional: function (element) {
                        var val = this.elementValue(element);
                        return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
                    },

                    startRequest: function (element) {
                        if (!this.pending[element.id]) {
                            this.pendingRequest++;
                            $(element).addClass(this.settings.pendingClass);
                            this.pending[element.id] = true;
                        }
                    },

                    stopRequest: function (element, valid) {
                        this.pendingRequest--;
                        // sometimes synchronization fails, make sure pendingRequest is never < 0
                        if (this.pendingRequest < 0) {
                            this.pendingRequest = 0;
                        }
                        delete this.pending[element.id];
                        $(element).removeClass(this.settings.pendingClass);
                        if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                            $(this.currentForm).submit();
                            this.formSubmitted = false;
                        } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                            $(this.currentForm).triggerHandler("invalid-form", [this]);
                            this.formSubmitted = false;
                        }
                    },

                    previousValue: function (element, method) {
                        return $.data(element, "previousValue") || $.data(element, "previousValue", {
                                old: null,
                                valid: true,
                                message: this.defaultMessage(element, {method: method})
                            });
                    },
                    // Cleans up all forms and elements, removes validator-specific events
                    destroy: function () {
                        this.resetForm();

                        $(this.currentForm)
                            .off(".validate")
                            .removeData("validator")
                            .find(".validate-equalTo-blur")
                            .off(".validate-equalTo")
                            .removeClass("validate-equalTo-blur");
                    }

                },

                classRuleSettings: {
                    required: {required: true},
                    email: {email: true},
                    url: {url: true},
                    date: {date: true},
                    dateISO: {dateISO: true},
                    number: {number: true},
                    digits: {digits: true},
                    creditcard: {creditcard: true}
                },

                addClassRules: function (className, rules) {
                    if (className.constructor === String) {
                        this.classRuleSettings[className] = rules;
                    } else {
                        $.extend(this.classRuleSettings, className);
                    }
                },

                classRules: function (element) {
                    var rules = {},
                        classes = $(element).attr("class");

                    if (classes) {
                        $.each(classes.split(" "), function () {
                            if (this in $.validator.classRuleSettings) {
                                $.extend(rules, $.validator.classRuleSettings[this]);
                            }
                        });
                    }
                    return rules;
                },

                normalizeAttributeRule: function (rules, type, method, value) {

                    // Convert the value to a number for number inputs, and for text for backwards compability
                    // allows type="date" and others to be compared as strings
                    if (/min|max|step/.test(method) && ( type === null || /number|range|text/.test(type) )) {
                        value = Number(value);

                        // Support Opera Mini, which returns NaN for undefined minlength
                        if (isNaN(value)) {
                            value = undefined;
                        }
                    }

                    if (value || value === 0) {
                        rules[method] = value;
                    } else if (type === method && type !== "range") {

                        // Exception: the jquery validate 'range' method
                        // does not test for the html5 'range' type
                        rules[method] = true;
                    }
                },

                attributeRules: function (element) {
                    var rules = {},
                        $element = $(element),
                        type = element.getAttribute("type"),
                        method, value;

                    for (method in $.validator.methods) {

                        // Support for <input required> in both html5 and older browsers
                        if (method === "required") {
                            value = element.getAttribute(method);

                            // Some browsers return an empty string for the required attribute
                            // and non-HTML5 browsers might have required="" markup
                            if (value === "") {
                                value = true;
                            }
                            // force non-HTML5 browsers to return bool
                            value = !!value;
                        } else {
                            value = $element.attr(method);
                        }

                        this.normalizeAttributeRule(rules, type, method, value);
                    }

                    // 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
                    if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                        delete rules.maxlength;
                    }

                    return rules;
                },

                dataRules: function (element) {
                    var rules = {},
                        $element = $(element),
                        type = element.getAttribute("type"),
                        method, value;

                    for (method in $.validator.methods) {
                        value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
                        this.normalizeAttributeRule(rules, type, method, value);
                    }
                    return rules;
                },

                staticRules: function (element) {
                    var rules = {},
                        validator = $.data(element.form, "validator");

                    if (validator.settings.rules) {
                        rules = $.validator.normalizeRule(validator.settings.rules[element.id]) || {};
                    }
                    return rules;
                },

                normalizeRules: function (rules, element) {
                    // handle dependency check
                    $.each(rules, function (prop, val) {
                        // ignore rule when param is explicitly false, eg. required:false
                        if (val === false) {
                            delete rules[prop];
                            return;
                        }
                        if (val.param || val.depends) {
                            var keepRule = true;
                            switch (typeof val.depends) {
                                case "string":
                                    keepRule = !!$(val.depends, element.form).length;
                                    break;
                                case "function":
                                    keepRule = val.depends.call(element, element);
                                    break;
                            }
                            if (keepRule) {
                                rules[prop] = val.param !== undefined ? val.param : true;
                            } else {
                                $.data(element.form, "validator").resetElements($(element));
                                delete rules[prop];
                            }
                        }
                    });

                    // Evaluate parameters
                    $.each(rules, function (rule, parameter) {
                        rules[rule] = $.isFunction(parameter) && rule !== "normalizer" ? parameter(element) : parameter;
                    });

                    // Clean number parameters
                    $.each(["minlength", "maxlength"], function () {
                        if (rules[this]) {
                            rules[this] = Number(rules[this]);
                        }
                    });
                    $.each(["rangelength", "range"], function () {
                        var parts;
                        if (rules[this]) {
                            if ($.isArray(rules[this])) {
                                rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                            } else if (typeof rules[this] === "string") {
                                parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                                rules[this] = [Number(parts[0]), Number(parts[1])];
                            }
                        }
                    });

                    if ($.validator.autoCreateRanges) {

                        // Auto-create ranges
                        if (rules.min != null && rules.max != null) {
                            rules.range = [rules.min, rules.max];
                            delete rules.min;
                            delete rules.max;
                        }
                        if (rules.minlength != null && rules.maxlength != null) {
                            rules.rangelength = [rules.minlength, rules.maxlength];
                            delete rules.minlength;
                            delete rules.maxlength;
                        }
                    }

                    return rules;
                },

                // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
                normalizeRule: function (data) {
                    if (typeof data === "string") {
                        var transformed = {};
                        $.each(data.split(/\s/), function () {
                            transformed[this] = true;
                        });
                        data = transformed;
                    }
                    return data;
                },

                // http://jqueryvalidation.org/jQuery.validator.addMethod/
                addMethod: function (name, method, message) {
                    $.validator.methods[name] = method;
                    $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
                    if (method.length < 3) {
                        $.validator.addClassRules(name, $.validator.normalizeRule(name));
                    }
                },

                // http://jqueryvalidation.org/jQuery.validator.methods/
                methods: {

                    // http://jqueryvalidation.org/required-method/
                    required: function (value, element, param) {
                        // check if dependency is met
                        if (!this.depend(param, element)) {
                            return "dependency-mismatch";
                        }
                        if (element.nodeName.toLowerCase() === "select") {
                            // could be an array for select-multiple or a string, both are fine this way
                            var val = $(element).val();
                            return val && val.length > 0;
                        }
                        if (this.checkable(element)) {
                            return this.getLength(value, element) > 0;
                        }
                        return value.length > 0;
                    },

                    // http://jqueryvalidation.org/email-method/
                    email: function (value, element) {

                        // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
                        // Retrieved 2014-01-14
                        // If you have a problem with this implementation, report a bug against the above spec
                        // Or use custom methods to implement your own email validation
                        return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
                    },

                    // http://jqueryvalidation.org/url-method/
                    url: function (value, element) {

                        // Copyright (c) 2010-2013 Diego Perini, MIT licensed
                        // https://gist.github.com/dperini/729294
                        // see also https://mathiasbynens.be/demo/url-regex
                        // modified to allow protocol-relative URLs
                        return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
                    },

                    // http://jqueryvalidation.org/date-method/
                    date: function (value, element) {
                        return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
                    },

                    // http://jqueryvalidation.org/dateISO-method/
                    dateISO: function (value, element) {
                        return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
                    },

                    // http://jqueryvalidation.org/number-method/
                    number: function (value, element) {
                        return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
                    },

                    // http://jqueryvalidation.org/digits-method/
                    digits: function (value, element) {
                        return this.optional(element) || /^\d+$/.test(value);
                    },

                    // http://jqueryvalidation.org/minlength-method/
                    minlength: function (value, element, param) {
                        var length = $.isArray(value) ? value.length : this.getLength(value, element);
                        return this.optional(element) || length >= param;
                    },

                    // http://jqueryvalidation.org/maxlength-method/
                    maxlength: function (value, element, param) {
                        var length = $.isArray(value) ? value.length : this.getLength(value, element);
                        return this.optional(element) || length <= param;
                    },

                    // http://jqueryvalidation.org/rangelength-method/
                    rangelength: function (value, element, param) {
                        var length = $.isArray(value) ? value.length : this.getLength(value, element);
                        return this.optional(element) || ( length >= param[0] && length <= param[1] );
                    },

                    // http://jqueryvalidation.org/min-method/
                    min: function (value, element, param) {
                        return this.optional(element) || value >= param;
                    },

                    // http://jqueryvalidation.org/max-method/
                    max: function (value, element, param) {
                        return this.optional(element) || value <= param;
                    },

                    // http://jqueryvalidation.org/range-method/
                    range: function (value, element, param) {
                        return this.optional(element) || ( value >= param[0] && value <= param[1] );
                    },

                    // http://jqueryvalidation.org/step-method/
                    step: function (value, element, param) {
                        var type = $(element).attr("type"),
                            errorMessage = "Step attribute on input type " + type + " is not supported.",
                            supportedTypes = ["text", "number", "range"],
                            re = new RegExp("\\b" + type + "\\b"),
                            notSupported = type && !re.test(supportedTypes.join());

                        // Works only for text, number and range input types
                        // TODO find a way to support input types date, datetime, datetime-local, month, time and week
                        if (notSupported) {
                            throw new Error(errorMessage);
                        }
                        return this.optional(element) || ( value % param === 0 );
                    },

                    // http://jqueryvalidation.org/equalTo-method/
                    equalTo: function (value, element, param) {

                        // Bind to the blur event of the target in order to revalidate whenever the target field is updated
                        var target = $(param);
                        if (this.settings.onfocusout && target.not(".validate-equalTo-blur").length) {
                            target.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                                $(element).valid();
                            });
                        }
                        return value === target.val();
                    },

                    // http://jqueryvalidation.org/remote-method/
                    remote: function (value, element, param, method) {
                        if (this.optional(element)) {
                            return "dependency-mismatch";
                        }
                        method = typeof method === "string" && method || "remote";
                        var previous = this.previousValue(element, method),
                            validator, data, optionDataString;

                        if (!this.settings.messages[element.id]) {
                            this.settings.messages[element.id] = {};
                        }
                        previous.originalMessage = previous.originalMessage || this.settings.messages[element.id][method];
                        this.settings.messages[element.id][method] = previous.message;

                        param = typeof param === "string" && {url: param} || param;
                        optionDataString = $.param($.extend({data: value}, param.data));
                        if (previous.old === optionDataString) {
                            return previous.valid;
                        }

                        previous.old = optionDataString;
                        validator = this;
                        this.startRequest(element);
                        data = {};
                        data[element.id] = value;
                        $.ajax($.extend(true, {
                            mode: "abort",
                            port: "validate" + element.id,
                            dataType: "json",
                            data: data,
                            context: validator.currentForm,
                            success: function (response) {
                                var valid = response === true || response === "true" || response.code == '200',
                                    errors, message, submitted;
                                validator.settings.messages[element.id][method] = previous.originalMessage;
                                if (valid) {
                                    submitted = validator.formSubmitted;
                                    validator.resetInternals();
                                    validator.toHide = validator.errorsFor(element);
                                    validator.formSubmitted = submitted;
                                    validator.successList.push(element);
                                    validator.invalid[element.id] = false;
                                    validator.showErrors();
                                } else {
                                    errors = {};
                                    message = response.message || response || validator.defaultMessage(element, {
                                            method: method,
                                            parameters: value
                                        });
                                    errors[element.id] = previous.message = message;
                                    validator.invalid[element.id] = true;
                                    validator.showErrors(errors);
                                }
                                previous.valid = valid;
                                validator.stopRequest(element, valid);
                            }
                        }, param));
                        return "pending";
                    }
                }

            });

            // Ajax mode: abort
            // usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
            // if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

            var pendingRequests = {},
                ajax;

            // Use a prefilter if available (1.5+)
            if ($.ajaxPrefilter) {
                $.ajaxPrefilter(function (settings, _, xhr) {
                    var port = settings.port;
                    if (settings.mode === "abort") {
                        if (pendingRequests[port]) {
                            pendingRequests[port].abort();
                        }
                        pendingRequests[port] = xhr;
                    }
                });
            } else {
                // Proxy ajax
                ajax = $.ajax;
                $.ajax = function (settings) {
                    var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
                        port = ( "port" in settings ? settings : $.ajaxSettings ).port;
                    if (mode === "abort") {
                        if (pendingRequests[port]) {
                            pendingRequests[port].abort();
                        }
                        pendingRequests[port] = ajax.apply(this, arguments);
                        return pendingRequests[port];
                    }
                    return ajax.apply(this, arguments);
                };
            }
        }(jQuery)
    //错误信息本地化
    //validate
    $.validator.setDefaults({
        onkeyup: false
    });
    $.extend($.validator.messages, {
        required: "此项必须填写",
        remote: "请修正此栏位",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入正确的数字",
        digits: "只可输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format("最多 {0} 个字"),
        minlength: $.validator.format("最少 {0} 个字"),
        rangelength: $.validator.format("请输入长度为 {0} 至 {1} 之間的字串"),
        range: $.validator.format("请输入 {0} 至 {1} 之间的数值"),
        max: $.validator.format("请输入不大于 {0} 的数值"),
        min: $.validator.format("请输入不小于 {0} 的数值")
    });
    // //////////////表单验证////////////////
    // 自定义验证
    // 手机号码验证
    jQuery.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(147)|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return this.optional(element)
            || (length == 11 && mobile
                .test(value));
    }, "请正确填写您的手机号码");
// 电话号码验证
    jQuery.validator.addMethod("isTel", function (value, element) {
        var phone = /^0\d{2,3}-\d{7,8}$/;
        return this.optional(element)
            || (phone.test(value));
    }, "请正确填写您的电话号码");

// 字符验证
    jQuery.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element)
            || /^[\u0391-\uFFE5\w]+$/.test(value);
    }, "只能包括中文字、英文字母、数字和下划线");

// 中文字两个字节
    jQuery.validator.addMethod("byteRangeLength", function (value, element, param) {
        var length = value.length;
        for (var i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) > 128) {
                length++;
            }
        }
        return this.optional(element)
            || (length >= param[0] && length <= param[1]);
    }, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");

// 下拉框验证
    jQuery.validator.addMethod("selectNone", function (value, element) {
        return value == "请选择";
    }, "必须选择一项");

//企业名称验证
    jQuery.validator.addMethod("companyName", function (value, element) {
        var phone = /^[\u4E00-\u9FA5\(\)\（\）]+$/;
        return this.optional(element)
            || (phone.test(value));
    }, "输入非法符号");

//邮政编码验证
    jQuery.validator.addMethod("postCode", function (value, element) {
        var postCode = /^[1-9][0-9]{5}$/;
        return this.optional(element)
            || (postCode.test(value));
    }, "输入非法符号");


// 用户名验证
    jQuery.validator.addMethod("isName", function (value, element) {
        var flag = false;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(147)|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var email = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var length = /^\w{6,30}$/;
        var d = /\d/;
        var z = /[a-zA-Z]/;
        var down = /\_/;
        var isname = false;
        var num = 0;
        if (d.test(value)) {
            num++;
        }
        if (z.test(value)) {
            num++;
        }
        if (down.test(value)) {
            num++;
        }
        if (num > 1) {
            isname = true;
        }
        if (mobile.test(value) || email.test(value)) {
            flag = true;
        }
        //console.log(email.test(value));
        return this.optional(element) || flag;
    }, "6-30位字母和数字、下划线的组合且首字符是字母");
// 密码验证
    jQuery.validator.addMethod("isPwd", function (value, element) {
        var length = /^\w{6,20}$/;
        var d = /[0-9]/;
        var z = /[a-zA-Z]/;
        var down = /([\x21-\x7e]+)/; //特殊字符
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        var ispwd = false;
        var num = 0;
        if (d.test(value)) {
            num++;
        }
        if (z.test(value)) {
            num++;
        }
        //if (pattern.test(value)) {
        //    num++;
        //}
        if (num > 1 && length.test(value)) {
            ispwd = true;
        }
        //console.log(pattern.test(value) + ' ' + num + ' ' + ispwd);
        return this.optional(element) || ispwd;
    }, "必须是6-20个英文字母、数字的组合，不能是纯数字");
//网址验证
    jQuery.validator.addMethod("isUrl", function (value, element) {
        var phone = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/;
        return this.optional(element)
            || (phone.test(value));
    }, "url验证");
//非数字特殊字符
    jQuery.validator.addMethod("noNumber",
        function (value, element) {
            var rex = /^([\u4e00-\u9fa5]|[a-zA-Z])*$/;
            return this.optional(element)
                || (rex.test(value));
        }, "请不要输入数字");
//全数字验证
    jQuery.validator.addMethod("isNumber",
        function (value, element) {
            var rex = /^[1-9]\d*$|^[1-9]\d*\.\d*$|0\.\d*[1-9]\d*$/;
            return this.optional(element)
                || (rex.test(value));
        }, "全数字验证");
//全数字验证and 0
    jQuery.validator.addMethod("isNumberAndZero",
        function (value, element) {
            var rex = /^[0-9]\d*$|^[1-9]\d*\.\d*$|0\.\d*[1-9]\d*$|0\.[0]{1,2}$/;
            return this.optional(element)
                || (rex.test(value));
        }, "全数字验证");
//正整数
    jQuery.validator.addMethod("isPositiveNumber",
        function (value, element) {
            var phone = /^[0-9][0-9_]*$/;
            return this.optional(element)
                || (phone.test(value));
        }, "正整数验证");
// 中文和英文验证
    jQuery.validator.addMethod("isCE", function (value, element) {
        var phone = /^[\u0391-\uFFE5A-Za-z]+$/;
        return this.optional(element)
            || (phone.test(value));
    }, "只能输入中文或者英文");

// 电子邮箱重写
    jQuery.validator.addMethod("isEmail", function (value, element) {
        var tel = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var length = /^.{6,30}$/;
        return this.optional(element)
            || (tel.test(value)) && (length.test(value));
    }, "请正确填写您的电子邮箱");
//中文名字
    jQuery.validator.addMethod("cnCharset", function (value, element) {
        return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
    });

//两位小数
    jQuery.validator.addMethod("numFixed", function (value, element) {
        return this.optional(element) || /^\d{0,8}\.{0,1}(\d{1,2})$/.test(value);
    });
//一元以下
    jQuery.validator.addMethod("oneDecimal", function (value, element) {
        return this.optional(element) || /^0+\.{0,1}(\d{1,2})$/.test(value);
    });
//金额比较大小
    jQuery.validator.addMethod("compareMoney", function (value, element, param) {
        if ($(param).val() == '' && value == '') {
            return true;
        }
        return parseFloat($(param).val()) <= parseFloat(value)
    });
//不能一致
    jQuery.validator.addMethod("noEqual", function (value, element, param) {
        return $(param).val() !== value
    });
//单笔提现限额
    jQuery.validator.addMethod("rechargeAmtLimit", function (value, element, param) {
        return parseFloat(param) >= parseFloat(value)
    });
//单日限额
    jQuery.validator.addMethod("cashAmt", function (value, element, param) {
        return parseFloat(param) >= parseFloat(value)
    });
//身份证验证
    jQuery.validator.addMethod("isID", function (idNo, element) {
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };

        if (!idNo || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idNo)) {
            return false;
        }

        if (!city[idNo.substr(0, 2)]) {
            return false;
        }

        //18位身份证需要验证最后一位校验位
        if (idNo.length == 18) {
            var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
            var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
            var sum = 0, idx;
            for (var i = 0; i < idNo.length - 1; i++) {
                // 对前17位数字与权值乘积求和
                sum += parseInt(idNo.substr(i, 1), 10) * arrExp[i];
            }
            // 计算模（固定算法）
            idx = sum % 11;
            // 检验第18为是否与校验码相等
            return arrValid[idx] == idNo.substr(17, 1).toUpperCase();
        }
        return true;
    }, "请正确填写您的身份证号码");
    var status = 1;
});