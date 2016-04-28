angular.module( 'gj.Geo' ).service( 'Geo', function( gettextCatalog )
{
	var _countries = null;
	var _regions = {};

	this.getCountryName = function( code )
	{
		var country = _.find( this.getCountries(), { code: code } );
		return country ? country.name : '';
	};

	this.getRegionName = function( country, code )
	{
		var region = _.find( this.getRegions( country ), { code: code } );
		return region ? region.name : '';
	};

	this.getCountries = function()
	{
		if ( !_countries ) {
			_countries = [
				{ code: 'af', name: gettextCatalog.getString( 'Afghanistan' ) },
				{ code: 'ax', name: gettextCatalog.getString( 'Aland Islands' ) },
				{ code: 'al', name: gettextCatalog.getString( 'Albania' ) },
				{ code: 'dz', name: gettextCatalog.getString( 'Algeria' ) },
				{ code: 'as', name: gettextCatalog.getString( 'American Samoa' ) },
				{ code: 'ad', name: gettextCatalog.getString( 'Andorra' ) },
				{ code: 'ao', name: gettextCatalog.getString( 'Angola' ) },
				{ code: 'ai', name: gettextCatalog.getString( 'Anguilla' ) },
				{ code: 'aq', name: gettextCatalog.getString( 'Antarctica' ) },
				{ code: 'ag', name: gettextCatalog.getString( 'Antigua and Barbuda' ) },
				{ code: 'ar', name: gettextCatalog.getString( 'Argentina' ) },
				{ code: 'am', name: gettextCatalog.getString( 'Armenia' ) },
				{ code: 'aw', name: gettextCatalog.getString( 'Aruba' ) },
				{ code: 'au', name: gettextCatalog.getString( 'Australia' ) },
				{ code: 'at', name: gettextCatalog.getString( 'Austria' ) },
				{ code: 'az', name: gettextCatalog.getString( 'Azerbaijan' ) },
				{ code: 'bs', name: gettextCatalog.getString( 'Bahamas' ) },
				{ code: 'bh', name: gettextCatalog.getString( 'Bahrain' ) },
				{ code: 'bd', name: gettextCatalog.getString( 'Bangladesh' ) },
				{ code: 'bb', name: gettextCatalog.getString( 'Barbados' ) },
				{ code: 'by', name: gettextCatalog.getString( 'Belarus' ) },
				{ code: 'be', name: gettextCatalog.getString( 'Belgium' ) },
				{ code: 'bz', name: gettextCatalog.getString( 'Belize' ) },
				{ code: 'bj', name: gettextCatalog.getString( 'Benin' ) },
				{ code: 'bm', name: gettextCatalog.getString( 'Bermuda' ) },
				{ code: 'bt', name: gettextCatalog.getString( 'Bhutan' ) },
				{ code: 'bo', name: gettextCatalog.getString( 'Bolivia' ) },
				{ code: 'bq', name: gettextCatalog.getString( 'Bonaire, Saint Eustatius and Saba' ) },
				{ code: 'ba', name: gettextCatalog.getString( 'Bosnia and Herzegovina' ) },
				{ code: 'bw', name: gettextCatalog.getString( 'Botswana' ) },
				{ code: 'bv', name: gettextCatalog.getString( 'Bouvet Island' ) },
				{ code: 'br', name: gettextCatalog.getString( 'Brazil' ) },
				{ code: 'io', name: gettextCatalog.getString( 'British Indian Ocean Territory' ) },
				{ code: 'vg', name: gettextCatalog.getString( 'British Virgin Islands' ) },
				{ code: 'bn', name: gettextCatalog.getString( 'Brunei' ) },
				{ code: 'bg', name: gettextCatalog.getString( 'Bulgaria' ) },
				{ code: 'bf', name: gettextCatalog.getString( 'Burkina Faso' ) },
				{ code: 'bi', name: gettextCatalog.getString( 'Burundi' ) },
				{ code: 'kh', name: gettextCatalog.getString( 'Cambodia' ) },
				{ code: 'cm', name: gettextCatalog.getString( 'Cameroon' ) },
				{ code: 'ca', name: gettextCatalog.getString( 'Canada' ) },
				{ code: 'cv', name: gettextCatalog.getString( 'Cape Verde' ) },
				{ code: 'ky', name: gettextCatalog.getString( 'Cayman Islands' ) },
				{ code: 'cf', name: gettextCatalog.getString( 'Central African Republic' ) },
				{ code: 'td', name: gettextCatalog.getString( 'Chad' ) },
				{ code: 'cl', name: gettextCatalog.getString( 'Chile' ) },
				{ code: 'cn', name: gettextCatalog.getString( 'China' ) },
				{ code: 'cx', name: gettextCatalog.getString( 'Christmas Island' ) },
				{ code: 'cc', name: gettextCatalog.getString( 'Cocos Islands' ) },
				{ code: 'co', name: gettextCatalog.getString( 'Colombia' ) },
				{ code: 'km', name: gettextCatalog.getString( 'Comoros' ) },
				{ code: 'ck', name: gettextCatalog.getString( 'Cook Islands' ) },
				{ code: 'cr', name: gettextCatalog.getString( 'Costa Rica' ) },
				{ code: 'hr', name: gettextCatalog.getString( 'Croatia' ) },
				{ code: 'cu', name: gettextCatalog.getString( 'Cuba' ) },
				{ code: 'cw', name: gettextCatalog.getString( 'Curacao' ) },
				{ code: 'cy', name: gettextCatalog.getString( 'Cyprus' ) },
				{ code: 'cz', name: gettextCatalog.getString( 'Czech Republic' ) },
				{ code: 'cd', name: gettextCatalog.getString( 'Democratic Republic of the Congo' ) },
				{ code: 'dk', name: gettextCatalog.getString( 'Denmark' ) },
				{ code: 'dj', name: gettextCatalog.getString( 'Djibouti' ) },
				{ code: 'dm', name: gettextCatalog.getString( 'Dominica' ) },
				{ code: 'do', name: gettextCatalog.getString( 'Dominican Republic' ) },
				{ code: 'tl', name: gettextCatalog.getString( 'East Timor' ) },
				{ code: 'ec', name: gettextCatalog.getString( 'Ecuador' ) },
				{ code: 'eg', name: gettextCatalog.getString( 'Egypt' ) },
				{ code: 'sv', name: gettextCatalog.getString( 'El Salvador' ) },
				{ code: 'gq', name: gettextCatalog.getString( 'Equatorial Guinea' ) },
				{ code: 'er', name: gettextCatalog.getString( 'Eritrea' ) },
				{ code: 'ee', name: gettextCatalog.getString( 'Estonia' ) },
				{ code: 'et', name: gettextCatalog.getString( 'Ethiopia' ) },
				{ code: 'fk', name: gettextCatalog.getString( 'Falkland Islands' ) },
				{ code: 'fo', name: gettextCatalog.getString( 'Faroe Islands' ) },
				{ code: 'fj', name: gettextCatalog.getString( 'Fiji' ) },
				{ code: 'fi', name: gettextCatalog.getString( 'Finland' ) },
				{ code: 'fr', name: gettextCatalog.getString( 'France' ) },
				{ code: 'gf', name: gettextCatalog.getString( 'French Guiana' ) },
				{ code: 'pf', name: gettextCatalog.getString( 'French Polynesia' ) },
				{ code: 'tf', name: gettextCatalog.getString( 'French Southern Territories' ) },
				{ code: 'ga', name: gettextCatalog.getString( 'Gabon' ) },
				{ code: 'gm', name: gettextCatalog.getString( 'Gambia' ) },
				{ code: 'ge', name: gettextCatalog.getString( 'Georgia' ) },
				{ code: 'de', name: gettextCatalog.getString( 'Germany' ) },
				{ code: 'gh', name: gettextCatalog.getString( 'Ghana' ) },
				{ code: 'gi', name: gettextCatalog.getString( 'Gibraltar' ) },
				{ code: 'gr', name: gettextCatalog.getString( 'Greece' ) },
				{ code: 'gl', name: gettextCatalog.getString( 'Greenland' ) },
				{ code: 'gd', name: gettextCatalog.getString( 'Grenada' ) },
				{ code: 'gp', name: gettextCatalog.getString( 'Guadeloupe' ) },
				{ code: 'gu', name: gettextCatalog.getString( 'Guam' ) },
				{ code: 'gt', name: gettextCatalog.getString( 'Guatemala' ) },
				{ code: 'gg', name: gettextCatalog.getString( 'Guernsey' ) },
				{ code: 'gn', name: gettextCatalog.getString( 'Guinea' ) },
				{ code: 'gw', name: gettextCatalog.getString( 'Guinea-Bissau' ) },
				{ code: 'gy', name: gettextCatalog.getString( 'Guyana' ) },
				{ code: 'ht', name: gettextCatalog.getString( 'Haiti' ) },
				{ code: 'hm', name: gettextCatalog.getString( 'Heard Island and McDonald Islands' ) },
				{ code: 'hn', name: gettextCatalog.getString( 'Honduras' ) },
				{ code: 'hk', name: gettextCatalog.getString( 'Hong Kong' ) },
				{ code: 'hu', name: gettextCatalog.getString( 'Hungary' ) },
				{ code: 'is', name: gettextCatalog.getString( 'Iceland' ) },
				{ code: 'in', name: gettextCatalog.getString( 'India' ) },
				{ code: 'id', name: gettextCatalog.getString( 'Indonesia' ) },
				{ code: 'ir', name: gettextCatalog.getString( 'Iran' ) },
				{ code: 'iq', name: gettextCatalog.getString( 'Iraq' ) },
				{ code: 'ie', name: gettextCatalog.getString( 'Ireland' ) },
				{ code: 'im', name: gettextCatalog.getString( 'Isle of Man' ) },
				{ code: 'il', name: gettextCatalog.getString( 'Israel' ) },
				{ code: 'it', name: gettextCatalog.getString( 'Italy' ) },
				{ code: 'ci', name: gettextCatalog.getString( 'Ivory Coast' ) },
				{ code: 'jm', name: gettextCatalog.getString( 'Jamaica' ) },
				{ code: 'jp', name: gettextCatalog.getString( 'Japan' ) },
				{ code: 'je', name: gettextCatalog.getString( 'Jersey' ) },
				{ code: 'jo', name: gettextCatalog.getString( 'Jordan' ) },
				{ code: 'kz', name: gettextCatalog.getString( 'Kazakhstan' ) },
				{ code: 'ke', name: gettextCatalog.getString( 'Kenya' ) },
				{ code: 'ki', name: gettextCatalog.getString( 'Kiribati' ) },
				{ code: 'xk', name: gettextCatalog.getString( 'Kosovo' ) },
				{ code: 'kw', name: gettextCatalog.getString( 'Kuwait' ) },
				{ code: 'kg', name: gettextCatalog.getString( 'Kyrgyzstan' ) },
				{ code: 'la', name: gettextCatalog.getString( 'Laos' ) },
				{ code: 'lv', name: gettextCatalog.getString( 'Latvia' ) },
				{ code: 'lb', name: gettextCatalog.getString( 'Lebanon' ) },
				{ code: 'ls', name: gettextCatalog.getString( 'Lesotho' ) },
				{ code: 'lr', name: gettextCatalog.getString( 'Liberia' ) },
				{ code: 'ly', name: gettextCatalog.getString( 'Libya' ) },
				{ code: 'li', name: gettextCatalog.getString( 'Liechtenstein' ) },
				{ code: 'lt', name: gettextCatalog.getString( 'Lithuania' ) },
				{ code: 'lu', name: gettextCatalog.getString( 'Luxembourg' ) },
				{ code: 'mo', name: gettextCatalog.getString( 'Macao' ) },
				{ code: 'mk', name: gettextCatalog.getString( 'Macedonia' ) },
				{ code: 'mg', name: gettextCatalog.getString( 'Madagascar' ) },
				{ code: 'mw', name: gettextCatalog.getString( 'Malawi' ) },
				{ code: 'my', name: gettextCatalog.getString( 'Malaysia' ) },
				{ code: 'mv', name: gettextCatalog.getString( 'Maldives' ) },
				{ code: 'ml', name: gettextCatalog.getString( 'Mali' ) },
				{ code: 'mt', name: gettextCatalog.getString( 'Malta' ) },
				{ code: 'mh', name: gettextCatalog.getString( 'Marshall Islands' ) },
				{ code: 'mq', name: gettextCatalog.getString( 'Martinique' ) },
				{ code: 'mr', name: gettextCatalog.getString( 'Mauritania' ) },
				{ code: 'mu', name: gettextCatalog.getString( 'Mauritius' ) },
				{ code: 'yt', name: gettextCatalog.getString( 'Mayotte' ) },
				{ code: 'mx', name: gettextCatalog.getString( 'Mexico' ) },
				{ code: 'fm', name: gettextCatalog.getString( 'Micronesia' ) },
				{ code: 'md', name: gettextCatalog.getString( 'Moldova' ) },
				{ code: 'mc', name: gettextCatalog.getString( 'Monaco' ) },
				{ code: 'mn', name: gettextCatalog.getString( 'Mongolia' ) },
				{ code: 'me', name: gettextCatalog.getString( 'Montenegro' ) },
				{ code: 'ms', name: gettextCatalog.getString( 'Montserrat' ) },
				{ code: 'ma', name: gettextCatalog.getString( 'Morocco' ) },
				{ code: 'mz', name: gettextCatalog.getString( 'Mozambique' ) },
				{ code: 'mm', name: gettextCatalog.getString( 'Myanmar' ) },
				{ code: 'na', name: gettextCatalog.getString( 'Namibia' ) },
				{ code: 'nr', name: gettextCatalog.getString( 'Nauru' ) },
				{ code: 'np', name: gettextCatalog.getString( 'Nepal' ) },
				{ code: 'nl', name: gettextCatalog.getString( 'Netherlands' ) },
				{ code: 'nc', name: gettextCatalog.getString( 'New Caledonia' ) },
				{ code: 'nz', name: gettextCatalog.getString( 'New Zealand' ) },
				{ code: 'ni', name: gettextCatalog.getString( 'Nicaragua' ) },
				{ code: 'ne', name: gettextCatalog.getString( 'Niger' ) },
				{ code: 'ng', name: gettextCatalog.getString( 'Nigeria' ) },
				{ code: 'nu', name: gettextCatalog.getString( 'Niue' ) },
				{ code: 'nf', name: gettextCatalog.getString( 'Norfolk Island' ) },
				{ code: 'kp', name: gettextCatalog.getString( 'North Korea' ) },
				{ code: 'mp', name: gettextCatalog.getString( 'Northern Mariana Islands' ) },
				{ code: 'no', name: gettextCatalog.getString( 'Norway' ) },
				{ code: 'om', name: gettextCatalog.getString( 'Oman' ) },
				{ code: 'pk', name: gettextCatalog.getString( 'Pakistan' ) },
				{ code: 'pw', name: gettextCatalog.getString( 'Palau' ) },
				{ code: 'ps', name: gettextCatalog.getString( 'Palestinian Territory' ) },
				{ code: 'pa', name: gettextCatalog.getString( 'Panama' ) },
				{ code: 'pg', name: gettextCatalog.getString( 'Papua New Guinea' ) },
				{ code: 'py', name: gettextCatalog.getString( 'Paraguay' ) },
				{ code: 'pe', name: gettextCatalog.getString( 'Peru' ) },
				{ code: 'ph', name: gettextCatalog.getString( 'Philippines' ) },
				{ code: 'pn', name: gettextCatalog.getString( 'Pitcairn' ) },
				{ code: 'pl', name: gettextCatalog.getString( 'Poland' ) },
				{ code: 'pt', name: gettextCatalog.getString( 'Portugal' ) },
				{ code: 'pr', name: gettextCatalog.getString( 'Puerto Rico' ) },
				{ code: 'qa', name: gettextCatalog.getString( 'Qatar' ) },
				{ code: 'cg', name: gettextCatalog.getString( 'Republic of the Congo' ) },
				{ code: 're', name: gettextCatalog.getString( 'Reunion' ) },
				{ code: 'ro', name: gettextCatalog.getString( 'Romania' ) },
				{ code: 'ru', name: gettextCatalog.getString( 'Russia' ) },
				{ code: 'rw', name: gettextCatalog.getString( 'Rwanda' ) },
				{ code: 'bl', name: gettextCatalog.getString( 'Saint Barthelemy' ) },
				{ code: 'sh', name: gettextCatalog.getString( 'Saint Helena' ) },
				{ code: 'kn', name: gettextCatalog.getString( 'Saint Kitts and Nevis' ) },
				{ code: 'lc', name: gettextCatalog.getString( 'Saint Lucia' ) },
				{ code: 'mf', name: gettextCatalog.getString( 'Saint Martin' ) },
				{ code: 'pm', name: gettextCatalog.getString( 'Saint Pierre and Miquelon' ) },
				{ code: 'vc', name: gettextCatalog.getString( 'Saint Vincent and the Grenadines' ) },
				{ code: 'ws', name: gettextCatalog.getString( 'Samoa' ) },
				{ code: 'sm', name: gettextCatalog.getString( 'San Marino' ) },
				{ code: 'st', name: gettextCatalog.getString( 'Sao Tome and Principe' ) },
				{ code: 'sa', name: gettextCatalog.getString( 'Saudi Arabia' ) },
				{ code: 'sn', name: gettextCatalog.getString( 'Senegal' ) },
				{ code: 'rs', name: gettextCatalog.getString( 'Serbia' ) },
				{ code: 'sc', name: gettextCatalog.getString( 'Seychelles' ) },
				{ code: 'sl', name: gettextCatalog.getString( 'Sierra Leone' ) },
				{ code: 'sg', name: gettextCatalog.getString( 'Singapore' ) },
				{ code: 'sx', name: gettextCatalog.getString( 'Sint Maarten' ) },
				{ code: 'sk', name: gettextCatalog.getString( 'Slovakia' ) },
				{ code: 'si', name: gettextCatalog.getString( 'Slovenia' ) },
				{ code: 'sb', name: gettextCatalog.getString( 'Solomon Islands' ) },
				{ code: 'so', name: gettextCatalog.getString( 'Somalia' ) },
				{ code: 'za', name: gettextCatalog.getString( 'South Africa' ) },
				{ code: 'gs', name: gettextCatalog.getString( 'South Georgia and the South Sandwich Islands' ) },
				{ code: 'kr', name: gettextCatalog.getString( 'South Korea' ) },
				{ code: 'ss', name: gettextCatalog.getString( 'South Sudan' ) },
				{ code: 'es', name: gettextCatalog.getString( 'Spain' ) },
				{ code: 'lk', name: gettextCatalog.getString( 'Sri Lanka' ) },
				{ code: 'sd', name: gettextCatalog.getString( 'Sudan' ) },
				{ code: 'sr', name: gettextCatalog.getString( 'Suriname' ) },
				{ code: 'sj', name: gettextCatalog.getString( 'Svalbard and Jan Mayen' ) },
				{ code: 'sz', name: gettextCatalog.getString( 'Swaziland' ) },
				{ code: 'se', name: gettextCatalog.getString( 'Sweden' ) },
				{ code: 'ch', name: gettextCatalog.getString( 'Switzerland' ) },
				{ code: 'sy', name: gettextCatalog.getString( 'Syria' ) },
				{ code: 'tw', name: gettextCatalog.getString( 'Taiwan' ) },
				{ code: 'tj', name: gettextCatalog.getString( 'Tajikistan' ) },
				{ code: 'tz', name: gettextCatalog.getString( 'Tanzania' ) },
				{ code: 'th', name: gettextCatalog.getString( 'Thailand' ) },
				{ code: 'tg', name: gettextCatalog.getString( 'Togo' ) },
				{ code: 'tk', name: gettextCatalog.getString( 'Tokelau' ) },
				{ code: 'to', name: gettextCatalog.getString( 'Tonga' ) },
				{ code: 'tt', name: gettextCatalog.getString( 'Trinidad and Tobago' ) },
				{ code: 'tn', name: gettextCatalog.getString( 'Tunisia' ) },
				{ code: 'tr', name: gettextCatalog.getString( 'Turkey' ) },
				{ code: 'tm', name: gettextCatalog.getString( 'Turkmenistan' ) },
				{ code: 'tc', name: gettextCatalog.getString( 'Turks and Caicos Islands' ) },
				{ code: 'tv', name: gettextCatalog.getString( 'Tuvalu' ) },
				{ code: 'vi', name: gettextCatalog.getString( 'U.S. Virgin Islands' ) },
				{ code: 'ug', name: gettextCatalog.getString( 'Uganda' ) },
				{ code: 'ua', name: gettextCatalog.getString( 'Ukraine' ) },
				{ code: 'ae', name: gettextCatalog.getString( 'United Arab Emirates' ) },
				{ code: 'gb', name: gettextCatalog.getString( 'United Kingdom' ) },
				{ code: 'us', name: gettextCatalog.getString( 'United States' ) },
				{ code: 'um', name: gettextCatalog.getString( 'United States Minor Outlying Islands' ) },
				{ code: 'uy', name: gettextCatalog.getString( 'Uruguay' ) },
				{ code: 'uz', name: gettextCatalog.getString( 'Uzbekistan' ) },
				{ code: 'vu', name: gettextCatalog.getString( 'Vanuatu' ) },
				{ code: 'va', name: gettextCatalog.getString( 'Vatican' ) },
				{ code: 've', name: gettextCatalog.getString( 'Venezuela' ) },
				{ code: 'vn', name: gettextCatalog.getString( 'Vietnam' ) },
				{ code: 'wf', name: gettextCatalog.getString( 'Wallis and Futuna' ) },
				{ code: 'eh', name: gettextCatalog.getString( 'Western Sahara' ) },
				{ code: 'ye', name: gettextCatalog.getString( 'Yemen' ) },
				{ code: 'zm', name: gettextCatalog.getString( 'Zambia' ) },
				{ code: 'zw', name: gettextCatalog.getString( 'Zimbabwe' ) },
			];
		}

		return _countries;
	};

	this.getRegions = function( country )
	{
		if ( !_regions[ country ] ) {
			if ( country == 'us' ) {
				_regions[ country ] = [
					{ code: 'al', name: gettextCatalog.getString( 'Alabama' ) },
					{ code: 'ak', name: gettextCatalog.getString( 'Alaska' ) },
					{ code: 'az', name: gettextCatalog.getString( 'Arizona' ) },
					{ code: 'ar', name: gettextCatalog.getString( 'Arkansas' ) },
					{ code: 'ca', name: gettextCatalog.getString( 'California' ) },
					{ code: 'co', name: gettextCatalog.getString( 'Colorado' ) },
					{ code: 'ct', name: gettextCatalog.getString( 'Connecticut' ) },
					{ code: 'de', name: gettextCatalog.getString( 'Delaware' ) },
					{ code: 'fl', name: gettextCatalog.getString( 'Florida' ) },
					{ code: 'ga', name: gettextCatalog.getString( 'Georgia' ) },
					{ code: 'hi', name: gettextCatalog.getString( 'Hawaii' ) },
					{ code: 'id', name: gettextCatalog.getString( 'Idaho' ) },
					{ code: 'il', name: gettextCatalog.getString( 'Illinois' ) },
					{ code: 'in', name: gettextCatalog.getString( 'Indiana' ) },
					{ code: 'ia', name: gettextCatalog.getString( 'Iowa' ) },
					{ code: 'ks', name: gettextCatalog.getString( 'Kansas' ) },
					{ code: 'ky', name: gettextCatalog.getString( 'Kentucky' ) },
					{ code: 'la', name: gettextCatalog.getString( 'Louisiana' ) },
					{ code: 'me', name: gettextCatalog.getString( 'Maine' ) },
					{ code: 'md', name: gettextCatalog.getString( 'Maryland' ) },
					{ code: 'ma', name: gettextCatalog.getString( 'Massachusetts' ) },
					{ code: 'mi', name: gettextCatalog.getString( 'Michigan' ) },
					{ code: 'mn', name: gettextCatalog.getString( 'Minnesota' ) },
					{ code: 'ms', name: gettextCatalog.getString( 'Mississippi' ) },
					{ code: 'mo', name: gettextCatalog.getString( 'Missouri' ) },
					{ code: 'mt', name: gettextCatalog.getString( 'Montana' ) },
					{ code: 'ne', name: gettextCatalog.getString( 'Nebraska' ) },
					{ code: 'nv', name: gettextCatalog.getString( 'Nevada' ) },
					{ code: 'nh', name: gettextCatalog.getString( 'New Hampshire' ) },
					{ code: 'nj', name: gettextCatalog.getString( 'New Jersey' ) },
					{ code: 'nm', name: gettextCatalog.getString( 'New Mexico' ) },
					{ code: 'ny', name: gettextCatalog.getString( 'New York' ) },
					{ code: 'nc', name: gettextCatalog.getString( 'North Carolina' ) },
					{ code: 'nd', name: gettextCatalog.getString( 'North Dakota' ) },
					{ code: 'oh', name: gettextCatalog.getString( 'Ohio' ) },
					{ code: 'ok', name: gettextCatalog.getString( 'Oklahoma' ) },
					{ code: 'or', name: gettextCatalog.getString( 'Oregon' ) },
					{ code: 'pa', name: gettextCatalog.getString( 'Pennsylvania' ) },
					{ code: 'ri', name: gettextCatalog.getString( 'Rhode Island' ) },
					{ code: 'sc', name: gettextCatalog.getString( 'South Carolina' ) },
					{ code: 'sd', name: gettextCatalog.getString( 'South Dakota' ) },
					{ code: 'tn', name: gettextCatalog.getString( 'Tennessee' ) },
					{ code: 'tx', name: gettextCatalog.getString( 'Texas' ) },
					{ code: 'ut', name: gettextCatalog.getString( 'Utah' ) },
					{ code: 'vt', name: gettextCatalog.getString( 'Vermont' ) },
					{ code: 'va', name: gettextCatalog.getString( 'Virginia' ) },
					{ code: 'wa', name: gettextCatalog.getString( 'Washington' ) },
					{ code: 'wv', name: gettextCatalog.getString( 'West Virginia' ) },
					{ code: 'wi', name: gettextCatalog.getString( 'Wisconsin' ) },
					{ code: 'wy', name: gettextCatalog.getString( 'Wyoming' ) },
					{ code: 'dc', name: gettextCatalog.getString( 'Washington D.C.' ) },
					{ code: 'as', name: gettextCatalog.getString( 'American Samoa' ) },
					{ code: 'gu', name: gettextCatalog.getString( 'Guam' ) },
					{ code: 'mp', name: gettextCatalog.getString( 'Northern Mariana Islands' ) },
					{ code: 'pr', name: gettextCatalog.getString( 'Puerto Rico' ) },
					{ code: 'vi', name: gettextCatalog.getString( 'U.S. Virgin Islands' ) },
				];
			}
			else if ( country == 'ca' ) {
				_regions[ country ] = [
					{ code: 'on', name: 'Ontario' },
					{ code: 'qc', name: 'Quebec' },
					{ code: 'ns', name: 'Nova Scotia' },
					{ code: 'nb', name: 'New Brunswick' },
					{ code: 'mb', name: 'Manitoba' },
					{ code: 'bc', name: 'British Columbia' },
					{ code: 'pe', name: 'Prince Edward Island' },
					{ code: 'sk', name: 'Saskatchewan' },
					{ code: 'ab', name: 'Alberta' },
					{ code: 'nl', name: 'Newfoundland and Labrador' },
					{ code: 'nt', name: 'Northwest Territories' },
					{ code: 'yt', name: 'Yukon' },
					{ code: 'nu', name: 'Nunavut' },
				];
			}
		}

		return _regions[ country ];
	};
} );
