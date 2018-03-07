import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ServerService {
  constructor(private http: Http) { }

  logInUser(email, password, company) {
    return this.http.get(`http://localhost:5555/api/logInUser/${email}/${password}/${company}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  checkCompany(company: any) {
    console.log(company);
    return this.http.get(`http://localhost:5555/api/company/exists/${company}/`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  checkUserLoggedIn(user, company) {
    return this.http.get(`http://localhost:5555/api/check/userlogged/user/${user.id}/email/${user.email}/token/${user.token}/company/${company.id}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  getManufacturers(company) {
    return this.http.get(`http://localhost:5555/api/getmanufacturers/company/${company}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  getAllInventory(company) {
    return this.http.get(`http://localhost:5555/api/getallinventory/company/${company}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  getInventory(company, id) {
    return this.http.get(`http://localhost:5555/api/getinventory/company/${company}/id/${id}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  getInventoryNumbers(company, id) {
    return this.http.get(`http://localhost:5555/api/getinventorynumbers/company/${company}/id/${id}`)
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  updateInventoryNumber(company, invenventoryNumberId, newNumber, newManufacturer) {
    return this.http.put(`http://localhost:5555/api/updateinventorynumber/company/${company}/numberid/${invenventoryNumberId}/newnumber/${newNumber}/newManufacturer/${newManufacturer}`,{})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  updateInventoryMainNumber(company, invenventoryNumberId, inventoryId) {
    return this.http.put(`http://localhost:5555/api/updateinventorymainnumber/company/${company}/numberid/${invenventoryNumberId}/inventoryid/${inventoryId}/`,{})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  saveInventoryNewNumber(company, invenventoryId, newNumber, newManufacturer) {
        return this.http.post(`http://localhost:5555/api/saveinventorynewnumber/company/${company}/partid/${invenventoryId}/newnumber/${newNumber}/newManufacturer/${newManufacturer}`,{})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }

  deleteInventoryNumber(company, numberId) {
        return this.http.delete(`http://localhost:5555/api/deleteinventorynumber/company/${company}/numberid/${numberId}`,{})
      .map((response: Response) => {
        const data = response.json();
        // console.log(data);
        return data;
      });
  }



}
