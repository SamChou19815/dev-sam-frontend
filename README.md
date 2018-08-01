# Developer Sam Website Frontend

The code of my own website frontend that is open-sourced.

This is the repository for the frontend of [my website](https://developersam.com), built by Angular 6. You can freely 
use any part of my code while sticking to the MIT license. A recommended approach is first copy the 
[shared folder](./src/app/shared) to your initialized Angular app and delete those unnecessary components according to 
your need.

# Open Source Acknowledgement

It is impossible for this website to run without:

- [Angular 6 (MIT)](https://github.com/angular/angular)
- [Angular Material (MIT)](https://github.com/angular/material2)
- [Angular Font Awesome (MIT)](https://github.com/baruchvlz/angular-font-awesome)

# Build Commands

You can find all build commands in [package.json](package.json).
 
I also write a script to auto-deploy it to my Google Kubernetes Engine. You can run it by `bash cloud-push-frontend.sh`.
Don't forget to change those account-specific variable in the script.
