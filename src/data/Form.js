
class Form {
  constructor(name, formID) {
    this.name = name;
    this.formID = formID;
  }

  setFromObject(ob) {
    this.name = ob.name;
    this.formID = ob.formID;
  }

  static fromObject(ob) {
    let d = new Form(ob.name);
    d.setFromObject(ob);
    return d;
  }
}

export default Form;
