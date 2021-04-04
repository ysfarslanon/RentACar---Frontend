import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup
  constructor(private formBuilder: FormBuilder, private brandService: BrandService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ["", Validators.required]//ve formControlName  brand model ile aynı olmalıdır   
    })
  }
  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response => {
        this.toastrService.success(response.message, "Ekleme başarılı")
          console.log(response)
      }, responseError => {
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
          }        
        }
      })
    } else {
      this.toastrService.error("Eksik bilgi", "Hata")
    }
  }
}