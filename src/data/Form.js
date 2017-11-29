import md5 from "md5";

class Form {
  constructor(name, formID) {
    this.name = name;
    this.formID = formID;
    this.fields = [];
  }

  setFromObject(ob) {
    this.name = ob.name;
    this.fields = ob.fields;
    this.formID = ob.formID;
  }

  static fromObject(ob) {
    let d = new Form(ob.name);
    d.setFromObject(ob);
    return d;
  }

  addField(form) {
    this.fields = this.fields.concat(form);
  }
}

export default Form;
