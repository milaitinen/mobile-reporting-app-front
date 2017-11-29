import md5 from "md5";

class Field {
  constructor(front, back, deckID) {
    this.front = front;
    this.back = back;
    this.deckID = deckID;
    this.formID = md5(front + back + deckID);
  }

  setFromObject(ob) {
    this.front = ob.front;
    this.back = ob.back;
    this.deckID = ob.deckID;
    this.formID = ob.formID;
  }

  static fromObject(ob) {
    let c = new Field(ob.front, ob.back, ob.deckID);
    c.setFromObject(ob);
    return c;
  }
}

export default Field;
