let sentenceBuilder = {
  subject: "I",
  verb: "am",
  object: "coding",
  buildSentence: function() {
    const subject = this.subject || "";
    const verb = this.verb || "";
    const object = this.object || "";

    return subject && verb && object ? `${subject} ${verb} ${object}` : "Incomplete sentence";
  },
  updateProperty: function(property, value) {
    if (this.hasOwnProperty(property)) {
      this[property] = value;
      return;
    } else {
      return "Invalid property";
    }
  }
};

console.log(sentenceBuilder.buildSentence());

sentenceBuilder.updateProperty("verb", "am learning");
console.log(sentenceBuilder.buildSentence());

sentenceBuilder.updateProperty("subject", "The cat");
console.log(sentenceBuilder.buildSentence());

console.log(sentenceBuilder.updateProperty("mood", "happy"));

sentenceBuilder.updateProperty("verb", "");
console.log(sentenceBuilder.buildSentence());

sentenceBuilder.buildSentenceConcise = function() {
  return `${this.subject ?? ""} ${this.verb ?? ""} ${this.object ?? ""}`.trim() || "Incomplete sentence";
};

console.log(sentenceBuilder.buildSentenceConcise());
