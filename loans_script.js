document.addEventListener('DOMContentLoaded', function() {
    // Get the form toggle buttons
    const depositBtn = document.getElementById('deposit-btn');
    const loanBtn = document.getElementById('loan-btn');
    
    // Get the forms
    const depositForm = document.getElementById('deposit-form');
    const loanForm = document.getElementById('loan-form');

    // Get calculate buttons
    const depositCalculateBtn = document.getElementById('deposit-calculate');
    const loanCalculateBtn = document.getElementById('loan-calculate');

    // Get result containers
    const depositResults = document.getElementById('deposit-results');
    const loanResults = document.getElementById('loan-results');

    // Loan type configurations
    const loanTypes = {
        'home': {
            interestRate: 9,
            maxTenure: 30,
            minAmount: 500000,    // 5L
            maxAmount: 10000000   // 1Cr
        },
        'car': {
            interestRate: 11,
            maxTenure: 7,
            minAmount: 100000,    // 1L
            maxAmount: 1500000    // 15L
        },
        'personal': {
            interestRate: 15,
            maxTenure: 5,
            minAmount: 10000,     // 10k
            maxAmount: 500000     // 5L
        }
    };

    // Switch to deposit calculator
    depositBtn.addEventListener('click', function() {
        depositBtn.classList.add('active');
        loanBtn.classList.remove('active');
        depositForm.classList.add('active-form');
        loanForm.classList.remove('active-form');
        depositResults.style.display = 'none';
        loanResults.style.display = 'none';
        clearErrors();
    });

    // Switch to loan calculator
    loanBtn.addEventListener('click', function() {
        loanBtn.classList.add('active');
        depositBtn.classList.remove('active');
        loanForm.classList.add('active-form');
        depositForm.classList.remove('active-form');
        depositResults.style.display = 'none';
        loanResults.style.display = 'none';
        clearErrors();
    });

    // Loan option cards selection
    const loanCards = document.querySelectorAll('.loan-option-card');
    loanCards.forEach(card => {
        card.addEventListener('click', function() {
            // Update the radio button
            const radioInput = this.querySelector('input[type="radio"]');
            radioInput.checked = true;
            
            // Update card selection styling
            loanCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Update loan details based on selected type
            updateLoanDetails(radioInput.value);
            
            // Clear any existing errors
            clearErrors();
        });
    });

    // Initialize first card as selected
    document.querySelector('.loan-option-card').classList.add('selected');

    // Initialize loan options
    updateLoanDetails('home');

    function updateLoanDetails(loanType) {
        // Update hidden radio buttons
        const interestRadios = document.querySelectorAll('input[name="loan-interest"]');
        const tenureRadios = document.querySelectorAll('input[name="loan-tenure"]');
        const amountRadios = document.querySelectorAll('input[name="loan-amount"]');
        
        // Select the corresponding radio buttons
        switch(loanType) {
            case 'home':
                document.getElementById('loan-interest-9').checked = true;
                document.getElementById('loan-tenure-30').checked = true;
                document.getElementById('loan-amount-5l-1cr').checked = true;
                break;
            case 'car':
                document.getElementById('loan-interest-11').checked = true;
                document.getElementById('loan-tenure-7').checked = true;
                document.getElementById('loan-amount-1l-15l').checked = true;
                break;
            case 'personal':
                document.getElementById('loan-interest-15').checked = true;
                document.getElementById('loan-tenure-5').checked = true;
                document.getElementById('loan-amount-10k-5l').checked = true;
                break;
        }
        
        // Update the displayed interest rate
        document.getElementById('selected-interest-rate').textContent = 
            loanTypes[loanType].interestRate + '%';
        
        // Clear inputs and errors
        document.getElementById('loan-amount-exact').value = '';
        document.getElementById('loan-tenure-exact').value = '';
        clearErrors();
    }

    function clearErrors() {
        // Hide all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.classList.remove('show-error');
        });
        
        // Remove error styling from inputs
        const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
        inputs.forEach(input => {
            input.classList.remove('input-error');
        });
    }

    // Deposit calculator validation and calculation
    depositCalculateBtn.addEventListener('click', function() {
        // Clear previous errors
        clearErrors();
        
        // Get values
        const principal = parseFloat(document.getElementById('deposit-principal').value);
        const maturityYears = parseFloat(document.getElementById('deposit-maturity').value);
        
        // Validate inputs
        let isValid = true;
        
        if (isNaN(principal) || principal <= 0) {
            document.getElementById('deposit-principal').classList.add('input-error');
            document.getElementById('deposit-principal-error').classList.add('show-error');
            isValid = false;
        }
        
        if (isNaN(maturityYears) || maturityYears < 1 || maturityYears > 10) {
            document.getElementById('deposit-maturity').classList.add('input-error');
            document.getElementById('deposit-maturity-error').classList.add('show-error');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Get interest rate
        const interestRate = parseFloat(document.querySelector('input[name="deposit-interest"]:checked').value) / 100;
        
        // Calculate using compound interest formula: A = P(1 + r)^t
        const maturityAmount = principal * Math.pow((1 + interestRate), maturityYears);
        const interestEarned = maturityAmount - principal;
        
        // Display results
        document.getElementById('maturity-amount').textContent = '₹' + maturityAmount.toFixed(2);
        document.getElementById('interest-earned').textContent = '₹' + interestEarned.toFixed(2);
        
        depositResults.style.display = 'block';
        
        // Scroll to results
        depositResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Loan calculator validation and calculation
    loanCalculateBtn.addEventListener('click', function() {
        // Clear previous errors
        clearErrors();
        
        // Get values
        const applicantName = document.getElementById('loan-applicant').value.trim();
        const loanAmount = parseFloat(document.getElementById('loan-amount-exact').value);
        const tenureYears = parseFloat(document.getElementById('loan-tenure-exact').value);
        const selectedLoanType = document.querySelector('input[name="loan-type"]:checked').value;
        
        // Get loan type constraints
        const loanConfig = loanTypes[selectedLoanType];
        
        // Validate inputs
        let isValid = true;
        
        if (!applicantName) {
            document.getElementById('loan-applicant').classList.add('input-error');
            document.getElementById('loan-applicant-error').classList.add('show-error');
            isValid = false;
        }
        
        if (isNaN(loanAmount) || loanAmount < loanConfig.minAmount || loanAmount > loanConfig.maxAmount) {
            document.getElementById('loan-amount-exact').classList.add('input-error');
            document.getElementById('loan-amount-error').textContent = 
                `Amount must be between ₹${loanConfig.minAmount.toLocaleString()} and ₹${loanConfig.maxAmount.toLocaleString()}`;
            document.getElementById('loan-amount-error').classList.add('show-error');
            isValid = false;
        }
        
        if (isNaN(tenureYears) || tenureYears <= 0 || tenureYears > loanConfig.maxTenure) {
            document.getElementById('loan-tenure-exact').classList.add('input-error');
            document.getElementById('loan-tenure-error').textContent = 
                `Tenure must be between 1 and ${loanConfig.maxTenure} years`;
            document.getElementById('loan-tenure-error').classList.add('show-error');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Get interest rate based on selected loan type
        const interestRate = loanConfig.interestRate / 100;
        
        // Convert annual interest rate to monthly and tenure to months
        const monthlyRate = interestRate / 12;
        const tenureMonths = tenureYears * 12;
        
        // Calculate EMI: [P x R x (1+R)^N]/[(1+R)^N-1]
        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                   (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        
        const totalAmount = emi * tenureMonths;
        const totalInterest = totalAmount - loanAmount;
        
        // Display results
        document.getElementById('monthly-emi').textContent = '₹' + emi.toFixed(2);
        document.getElementById('total-interest').textContent = '₹' + totalInterest.toFixed(2);
        document.getElementById('total-amount').textContent = '₹' + totalAmount.toFixed(2);
        
        loanResults.style.display = 'block';
        
        // Scroll to results
        loanResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});