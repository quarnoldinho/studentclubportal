// Form validation and submission
    document.getElementById('billingForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!this.checkValidity() === false) {
        e.stopPropagation();
      }
      
      this.classList.add('was-validated');
      
      if (this.checkValidity()) {
        // Collect form data
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          gameTitle: document.getElementById('gameTitle').value,
          address: document.getElementById('address').value,
          city: document.getElementById('city').value,
          state: document.getElementById('state').value,
          zip: document.getElementById('zip').value,
          creditCardNumber: document.getElementById('creditCardNumber').value,
          expirationDate: document.getElementById('expirationDate').value,
          cvv: document.getElementById('cvv').value,
          registrationFee: document.getElementById('registrationFee').value
        };
        
        console.log('Billing Form Submitted:', formData);
        alert('Payment processed successfully! (Demo only)');
        window.location.href = 'cart.html';
      }
    });