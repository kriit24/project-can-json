function canJSON(value, onSuccess, onError) {

    //assume that value is json object
    if (typeof value === "object" && value !== null) {

        if (onSuccess !== undefined) {

            return onSuccess(value);
        }
        return {};
    }

    if (typeof value !== 'string' || value.length === 0) {

        if (onError !== undefined) {

            return onError(value);
        }
        return {};
    }

    value = value.replace(/^\s+|\s+$/g, "");
    value = value.replace(/\\n/g, "\\n")
        .replace(/\\N/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
    // remove non-printable and other non-valid JSON chars
    value = value.replace(/[\u0000-\u0019]+/g, "");

    if ((value.substr(0, 1) === '{' || value.substr(0, 1) === '[') && (value.substr((value.length - 1), 1) === '}' || value.substr((value.length - 1), 1) === ']')) {
        //if( value.substr(0,1) == '{' || value.substr(0,1) == '[' ){

        if (onSuccess !== undefined) {

            return onSuccess(JSON.parse(value));
        }
        return JSON.parse(value);
    }

    if (onError !== undefined) {

        return onError(value);
    }
    return {};
}

module.exports = canJSON
