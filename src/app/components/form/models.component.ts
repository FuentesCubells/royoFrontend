export interface FormField {
  placeholder: string;
  error: string;
  value: string
}

export interface FormFields {
  [key: string]: FormField;

  nombre: FormField;
  email: FormField;
  telefono: FormField;
}

export interface Form {
  [key: string]: any

  form: FormFields;
  checkbox: any;
  isSubmitted: any;
  errors: any; 
}

