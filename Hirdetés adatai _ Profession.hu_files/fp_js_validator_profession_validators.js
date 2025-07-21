/**
 * Egyedi professionos validaciok implementalasa az inline formos validalashoz
 */
/**
 *
 */
function ProfessionFormsConstraintLangAndLangLevelSelected() {
    this.message = '';

    this.validate = function(value) {
        var errors = [];
        if (null !== value) {
//            errors.push(this.message.replace('{{ value }}', FpJsBaseConstraint.formatValue(value)));
        }

        return errors;
    }
}

/**
 * Jelszo es jelszomegerosites egyezoseg ellenorzese
 */
function ProfessionFormsConstraintPasswordConfirm() {
    this.message = '';
    this.name = '';

    this.validate = function(value) {
        var passwd = $("input[name*="+this.name+"]:first");
        var repasswd = $("input[name*="+this.name+"]:last");

        var errors = [];
        if (passwd.val() != repasswd.val()) {
            errors.push(this.message);
        }

        return errors;
    }
}

function ProfessionFormsConstraintIsKeywordLengthGood() {
    this.message = '';

    this.validate = function(valueToCheck) {
        var errors = [];

        if (valueToCheck && isJsonString(valueToCheck)) {
            valueToCheck = JSON.parse(valueToCheck);
            var cleanKeyword = valueToCheck.map(({ value }) => value).join(', ');

            if (cleanKeyword.length > 160) {
                errors.push(this.message.replace('{{ limit }}', '160'));
            }
        }

        return errors;
    };

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }

        return true;
    }
}

/**
 * Adószám ellenőrzése formailag
 */
function ProfessionFormsConstraintTaxnumber() {
    this.message = '';
    this.taxnumber_type = 'hu';

    this.validate = function(value) {
        var errors = [];
        if (this.taxnumber_type == 'eu') {
            if (!nCheckEUAdoszam(value)) {
                errors.push(this.message);
            }
        } else {
            value = $("input[name*=taxnumber_part_]").map(function() {
                return $(this).val();
            }).toArray().join('');
            if (nCheckAdoszam(value) != 0) {
                errors.push(this.message);
            }
        }

        return errors;
    };

    function nCheckEUAdoszam(euadoszam) {
        let taxNumberType = document.getElementById('registration_form_company_taxnumber_type');
        let taxNumberDiv = document.getElementById('tax_number_type');

        if (/^<(.|\n)*?>/.test(euadoszam) || euadoszam.length === 0) {
            return false;
        }

        if (euadoszam.substr(0,2) === "HU") { // Magyar EU-sat nem adhat meg
            return false;
        }

        if (
            (taxNumberType && taxNumberType.checked) ||
            (taxNumberType && taxNumberType.classList.contains('d-none')) ||
            (taxNumberDiv && taxNumberDiv.classList.contains('d-none'))
        ) {
            return true;
        }

        return /^[A-Z]{2}[A-Z0-9]+/.test(euadoszam);
    }

    function nCheckAdoszam(cAdoszam) {
        var nLen = cAdoszam.length;
        if (nLen != 11)
        {
           return 10;
        }

        var cCB = "97319731";
        var cFirst = cAdoszam.substring(0, 1);
        var nCDV, nSum = 0, nKamu = 1;

        for (nCounter = 0; nCounter <= 7; nCounter++)
        {
            nCDV = cAdoszam.substring(nCounter, nCounter+1) * cCB.substring(nCounter, nCounter+1);
            nSum += nCDV;
            if (cAdoszam.substring(nCounter, 1) != cFirst) nKamu = 0;
        }
        if (nKamu == 1) return 13;
        return (nSum % 10);
    }
}
/**
 * Cim hossz ellenorzese
 */
function ProfessionFormsConstraintAddressLength() {
    this.message = '';

    this.field_prefix = '';

    this.validate = function(value) {

        var address = $("input[id=registration_form_company_"+this.field_prefix+"c_address_street_name], input[id=registration_form_company_"+this.field_prefix+"c_address_street_number]").map(function() {
            return $(this).val();
        }).toArray().join(" ");

        address += " " + $("select[id=registration_form_company_"+this.field_prefix+"c_address_p_type] option:selected").text()

        var errors = [];
        if (address.length > 100) {
            errors.push(this.message);
        }

        return errors;
    }
}

/**
 * Tobb email cim ellenorzese a mezoben
 */
function ProfessionFormsConstraintMultiEmail() {
    this.message = '';

    this.pattern = /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/i;

    this.validate = function(value) {
        if(value.length === 0) {
            return [];
        }
        var emails = value.replace(", ", "").replace(" ,", "").toLowerCase().split(",");

        var errors = [];

        for(var idx = 0; idx < emails.length; idx++) {
            if (!(new RegExp(this.pattern)).test(emails[idx])) {
                errors.push(this.message.replace("###EMAIL###", emails[idx]));
            }
        }

        return errors;
    }
}

function ProfessionFormsConstraintSingleEmail() {
    this.message = '';

    this.pattern = /^[\.\+_a-z0-9-]+@([0-9a-z][0-9a-z-\.]*[0-9a-z][\.])+([a-z]+)$/i;

    this.validate = function(value) {
        if(value.length === 0) {
            return [];
        }

        var errors = [];

        if (!(new RegExp(this.pattern)).test(value)) {
            errors.push(this.message.replace("###EMAIL###", value));
        }

        return errors;
    }
}

function ProfessionFormsConstraintEmail() {
    this.message = '';

    this.pattern = /^[\.\+_a-z0-9-]+@([0-9a-z][0-9a-z-\.]*[0-9a-z][\.])+([a-z]+)$/i;

    this.validate = function(value) {
        if(value.length === 0) {
            return [];
        }
        value = value.trim();

        var errors = [];

        if (!(new RegExp(this.pattern)).test(value)) {
            errors.push(this.message.replace("###EMAIL###", value));
        }

        return errors;
    }
}


/**
 * nem tartalmazhat email cimet
 */
function ProfessionFormsConstraintNotContainEmail() {
    this.message = '';

    this.pattern = /[\.\+_a-z0-9-]+@([0-9a-z][0-9a-z-\.]*[0-9a-z][\.])+([a-z]+)/i;

    this.validate = function(value) {
        var errors = [];

        if (this.pattern.test(value)) {
            errors.push(this.message);
        }

        return errors;
    }
}

/**
 * wysiwig szerkesztos mezo hosszanak ellenorzese
 */
function ProfessionFormsConstraintWysiwygLength() {
    this.maxMessage = '';
    this.minMessage = '';
    this.exactMessage = '';
    this.max = null;
    this.min = null;

    this.strip = function(html) {
        var tmp = document.createElement("div");

        $(tmp).html(html);

        return $(tmp).text();
    }

    this.validate = function (value) {
        var errors = [];
        var f = FpJsFormValidator;

        // a ckeditor word count pluginjevel osszhangban kell dolgozni
        value = value.
            replace(/(\r\n|\n|\r)/gm, "").
            replace(/&nbsp;/gi, " ");

        value = this.strip(value).replace(/^([\t\r\n]*)$/, "");

        var length = f.getValueLength(value);

        if ('' !== value && null !== length) {
            if (this.max === this.min && length !== this.min) {
                errors.push(this.exactMessage);
                return errors;
            }
            if (!isNaN(this.max) && length > this.max) {
                errors.push(this.maxMessage);
            }
            if (!isNaN(this.min) && length < this.min) {
                errors.push(this.minMessage);
            }
        }

        return errors;
    };

    this.onCreate = function () {
        this.min = parseInt(this.min);
        this.max = parseInt(this.max);

        this.minMessage = FpJsBaseConstraint.prepareMessage(
            this.minMessage,
            {'###limit###': FpJsBaseConstraint.formatValue(this.min)},
            this.min
        );
        this.maxMessage = FpJsBaseConstraint.prepareMessage(
            this.maxMessage,
            {'###limit###': FpJsBaseConstraint.formatValue(this.max)},
            this.max
        );
        this.exactMessage = FpJsBaseConstraint.prepareMessage(
            this.exactMessage,
            {'###limit###': FpJsBaseConstraint.formatValue(this.min)},
            this.min
        );
    }
}

/**
 * email ellenorzese
 */
function ProfessionFormsConstraintEmailConfirm() {
    this.message = '';

    this.validate = function(value) {
        var errors = [];
        var regexp = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

        if (!FpJsFormValidator.isValueEmty(value)) {
            value = value.trim();

            if (regexp.test(value)) {
                $.ajax({
                    url : "/ajax/check-email?lang=" + prof_adv.lang,
                    type: "POST",
                    async: false,
                    data : {
                        email: value
                    },
                    success: function(data){
                        if (!data.success) {
                            errors.push(data.message);
                        }
                    }
                });
            }
        }

        return errors;
    }
}
/**
 * Szuletesi ido ellenorzese
 */
function ProfessionFormsConstraintBorndateConfirm() {
    this.message = '';
    this.lowerMessage = '';
    this.upperMessage = '';

    this.validate = function(value) {
        var errors = [];
        if (value) {
            if (value < new Date().getFullYear() - 90) {
                errors.push(this.lowerMessage.replace('###MIN###', new Date().getFullYear() - 90));
            }
            var date = new Date();
            date.setFullYear(date.getFullYear() - 16);
            if (value > date.getFullYear()) {
                errors.push(this.upperMessage.replace('###MAX###', value));
            }
        }
        return errors;
    }
}

/**
 * Munkakor ellenorzes
 */
function ProfessionFormsConstraintWorkingStatus() {
    this.message = '';

    this.validate = function(value) {
        let working_status = $("select[name*='working_status']").val() || 'unknown'
        var errors = [];
        if (!(working_status === 'entrant' || working_status === 'unknown') && value.length === 0) {
            errors.push(this.message);
        }
        return errors;
    }
}

/**
 * nem tartalmazhat email cimet
 */
function ProfessionFormsConstraintNotContainStopword() {
	this.message = '';
	this.stopWords = [];

	this.onCreate = function () {
	    if (typeof __profEcomStopwordList === 'undefined') {
	        throw new Error('Please load /ecom/list-stopwords.js first.');
        }

	    var type = this.advType == 'start' ? 'start' : 'all';
	    var type = this.domainEnable ? 'withoutDomain' : type;

        this.stopWords = window.__profEcomStopwordList[type];
	};

	this.validate = function(value) {
		var errors = [];
		var hits = [];

		$.each(this.stopWords, function(key, word) {
			if (value.indexOf(word) !== -1) {
				hits.push(word);
			}
		});

		if (hits.length > 0) {
			var text = hits.toString();
			var errorMessage = this.message;
			errorMessage = FpJsBaseConstraint.prepareMessage(
	            this.message,
	            {'###STOPWORDS###': FpJsBaseConstraint.formatValue(text)},
	            text
	        );
			errors.push(errorMessage);
		}

		return errors;
	}
}

/**
 * nem tartalmazhat 35%-nal tobb nagybetut
 */
function ProfessionFormsConstraintUpperCaseRate() {
    this.message = '';

    this.onCreate = function () {
        if (typeof __profEcomStopwordList === 'undefined') {
            throw new Error('Please load /ecom/list-stopwords.js first.');
        }
    };

    this.validate = function (textOriginal) {
        var errors = [];
        // html tag közé kell rakni, mert ha nem és talál valamit,
        // amit html-nek vél akkor kivágja a közte levő részt és csak a szöveg egy részét adja vissza
        var text = $('<p>' + textOriginal + '</p>').text();

        for (var i = 0, letterNum = 0, len = text.length, count = 0; i < len; ++i) {
            var char = text.charAt(i);
            var upperChar = char.toUpperCase();

            if (char.toLowerCase() != upperChar) {
                if (char === upperChar) {
                    ++count;
                }
                ++letterNum;
            }
        }

        var rate = letterNum > 0 ? (count / letterNum) : 0;

        if (rate > 0.35) {
            var errorMessage = this.message;
            errorMessage = FpJsBaseConstraint.prepareMessage(
                this.message,
                {'###STOPWORDS###': FpJsBaseConstraint.formatValue(text)},
                text
            );
            errors.push(errorMessage);
        }

        return errors;
    }
}

function ProfessionFormsConstraintCustomGreater() {
    this.message = '';
    this.name = '';

    this.validate = function(value) {
        var salary = value.trim().replace(new RegExp(/[^\d]+/gi), '');

        var errors = [];

        if (salary <= 100000 && salary != '' && salary != null) {
            errors.push(this.message);
        }

        return errors;
    }
}

function ProfessionFormsConstraintNoGreaterThan() {
    this.message = '';
    this.name = '';

    this.validate = function (value) {
        var salary = value.trim().replace(new RegExp(/[^\d]+/gi), '');

        var errors = [];

        if (salary > 9999999) {
            errors.push(this.message);
        }

        return errors;

    }
}

function ProfessionFormsConstraintWorkplace() {
    this.validate = function (value) {
        var errors = [];

        $.ajax({
            url : "/validator/workplaceValidator",
            type: "POST",
            data : {workplace: value},
            async: false,
            success : function(data) {
                if (data !== false) {
                    errors.push(data);
                }
            }
        });

        return errors;
    }
}

/**
 * Name transformer.
 *
 * @constructor
 */
function ProfessionFormsTransformerNameTransformer() {
    /**
     * Name field transformer.
     *
     * @param  {String} value
     * @return {String}
     */
    this.reverseTransform = function(value) {
        if (value) {
            value = value.replace(new RegExp('/^[a-zöüóőúéáűíÖÜÓŐÚÉÁŰÍ\-]+(\s+[a-zöüóőúéáűíÖÜÓŐÚÉÁŰÍ\-]+)+$/i'));
            value = value.trim();
        }
        return value;
    }
}

// /**
//  * Város, ország
//  */
function ProfessionFormsConstraintLocation() {
    this.validate = function (value) {
        var message = prof.i18n.translate('validations', 'location.invalid');
        var errors = [];
        var valid = false;
        value = value.charAt(0).toUpperCase() + value.slice(1);
        if (value !== "") {
            $.ajax({
                url: '/ajax/address-complete',
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {
                    term: value,
                    addCountries: 1,
                    lang: prof.i18n.currentLanguage()
                },
                success: function (data) {
                    if (data && data.length > 0) {
                        $.each(data, function (i, term) {
                            if (term.name === value) {
                                valid = true;

                                if ($("#city")) {
                                    $("#city").val(value);
                                }
                                if ($("#country_id")) {
                                    $("#country_id").val(term.country_id);
                                }
                                if ($("#county_id")) {
                                    $("#county_id").val(term.megye_id);
                                }
                                if ($("#location_id")) {
                                    $("#location_id").val(term.megye_id);
                                }
                                if ($("#postal_code")) {
                                    $("#postal_code").val(term.postal_code);
                                }
                                if ($("#city_id")) {
                                    $("#city_id").val(term.id);
                                }
                            }
                        })
                    }
                    if (!valid) {
                        errors.push(message);
                    }
                }
            });
        }
        return errors;
    }
}

function ProfessionFormsConstraintChecked() {
    this.name = '';
    this.message = '';

    this.validate = function(value) {
        let checked = $('input[name="' + this.name + '"]:checked');
        let errors = [];

        if (checked.length < 1) {
            errors.push(this.message);
        }

        return errors;
    }
}

function ProfessionFormsConstraintInCampaign2022Positions() {
    this.validate = function (value) {
        var errors = [];
        var $advPattern = $('#adv_pattern');

        if (value.length > 0 && !$advPattern.hasClass('selected')) {
            $.ajax({
                url: "/keressjobban/validate-position",
                data: {'adv_pattern': value},
                type: 'POST',
                async: false,
                dataType: 'json',
                success: function (result) {
                    errors = result.errors;
                    if (errors.length === 0 && $advPattern.val() === value) {
                        $advPattern.addClass('selected');
                    }
                }
            });
        }

        return errors;
    };
}

function ProfessionFormsConstraintRegex()
{
    this.message = '';

    this.validate = function(value, pattern) {
        if(value.length === 0) {
            return [];
        }

        let errors = [];

        if (!(new RegExp(pattern)).test(value)) {
            errors.push(this.message);
        }

        return errors;
    }
}

function ProfessionFormsConstraintNetSalary() {
    this.min = '';
    this.minMessage = '';
    this.max = '';
    this.maxMessage = '';

    this.validate = function (value) {
        var errors = [];
        var salary = parseInt(value.trim().replace(/\D+/gi, ''));

        if (isNaN(salary)) {
            return errors;
        }

        if (salary < this.min) {
            errors.push(this.minMessage.replace('{{ min }}', prof.utils.formatSalary(this.min)));
        }

        if (salary >= this.max) {
            errors.push(this.maxMessage.replace('{{ max }}', prof.utils.formatSalary(this.max)));
        }

        return errors;
    }
}
