import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ServerService {
  constructor(private http: Http) { }
  private host: string = 'http://localhost:5555';

  logInUser(email, password, company) {
    return this.http.get(`${this.host}/api/logInUser/${email}/${password}/${company}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  checkCompany(company: any) {
    // console.log(company);
    return this.http.get(`${this.host}/api/company/exists/${company}/`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  checkUserLoggedIn(user, company) {
    return this.http.get(`${this.host}/api/check/userlogged/user/${user.id}/email/${user.email}/token/${user.token}/company/${company.id}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  getManufacturers(company) {
    return this.http.get(`${this.host}/api/getmanufacturers/company/${company}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  getAllInventory(company) {
    return this.http.get(`${this.host}/api/getallinventory/company/${company}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  getInventory(company, id) {
    return this.http.get(`${this.host}/api/getinventory/company/${company}/id/${id}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  getInventoryNumbers(company, id) {
    return this.http.get(`${this.host}/api/getinventorynumbers/company/${company}/id/${id}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  getInventoryImage(company, id) {
    return this.http.get(`${this.host}/api/getinventoryimage/company/${company}/id/${id}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  updateInventoryNumber(company, invenventoryNumberId, newNumber, newManufacturer) {
    return this.http.put(`${this.host}/api/updateinventorynumber/company/${company}/numberid/${invenventoryNumberId}/newManufacturer/${newManufacturer}`,{newNumber:newNumber})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  updateInventoryMainNumber(company, invenventoryNumberId, inventoryId) {
    return this.http.put(`${this.host}/api/updateinventorymainnumber/company/${company}/numberid/${invenventoryNumberId}/inventoryid/${inventoryId}/`,{})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  saveInventoryNewNumber(company, invenventoryId, newNumber, newManufacturer) {
        return this.http.post(`${this.host}/api/saveinventorynewnumber/company/${company}/partid/${invenventoryId}/newManufacturer/${newManufacturer}`,{newNumber:newNumber})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  deleteInventoryNumber(company, numberId) {
        return this.http.delete(`${this.host}/api/deleteinventorynumber/company/${company}/numberid/${numberId}`,{})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  updateInventoryDescription(company, invenventoryId, newDescription) {
    return this.http.put(`${this.host}/api/updateinventorydescription/company/${company}/inventoryid/${invenventoryId}`,{newDescription:newDescription})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  updateManufacturer(company,id, name, fullName) {
    return this.http.put(`${this.host}/api/updatemanufacturer/company/${company}/id/${id}`,{name:name, fullName:fullName})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  deleteManufacturer(company, id) {
        return this.http.delete(`${this.host}/api/deletemanufacturer/company/${company}/id/${id}`,{})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  addManufacturer(company, name, fullName) {
        return this.http.post(
          `${this.host}/api/addmanufacturer/company/${company}`,{name: name, fullName: fullName})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  updateImage(company, image, partId) {
        return this.http.post(
          `${this.host}/api/updateimage/company/${company}`,{image: image, partId: partId})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

}
