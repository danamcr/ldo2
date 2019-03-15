module.exports = class Builder {
    constructor() {
        this._string = "";
    }

    add(string) {
        this._string += string;
    }

    addLine(line) {
        this._string += line + "\n";
    }

    toString() {
        return this._string.trim();
    }
}