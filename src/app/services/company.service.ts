export interface Company {
  id: number;
  name: string;
  fullName: string;
  email?: string;
}

export class CompanyService {
  company: Company;
}
