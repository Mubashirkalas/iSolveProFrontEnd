import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UpdatePasswordDto } from '../../models/model-update-password';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {

  updatePasswordDto: UpdatePasswordDto = {
    userId: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',

  };

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;

  constructor(private authService: AuthService) {}

  togglePasswordVisibility(field: string) {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmNewPassword = !this.showConfirmNewPassword;
    }
  }


  ngOnInit() {
    // Automatically set userId from AuthService
    const userId = this.authService.getUserId();
  if (userId) {
    this.updatePasswordDto.userId = userId;
  } else {
    console.error('User ID not found in localStorage');
  }
    
  }

  onSubmit() {
    if (this.updatePasswordDto.newPassword !== this.updatePasswordDto.confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New password and confirm new password do not match.',
      });
      return;
    }

    this.authService.updatePassword(this.updatePasswordDto).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Password Updated',
          text: 'Your password has been updated successfully.',
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was an error updating your password.',
        });
      }
    );
  }
  }


