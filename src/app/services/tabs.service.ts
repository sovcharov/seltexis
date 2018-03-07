export class Tabs {

  main: any[];

  constructor(

  ) {
    this.main = [
    ];
  }


  addTab(name, href) {
    let inTabs: boolean = false;
    // console.log(href, name);
    for (let i: number = 0; i < this.main.length; i += 1) {
      if (this.main[i].href === href) {
        inTabs = true;
      }
    }
    if (!inTabs) {
      this.main[this.main.length] = { name: name, href: href };
    }
  }

  closeTab(index) {
    this.main.splice(index, 1);
  }



}
