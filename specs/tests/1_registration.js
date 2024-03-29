describe('Example of mocha tests', () => {
    before('Should open project', async function() {
        await browser.url(`/HiqoMeetup`);
        await expect(browser).toHaveTitle('Example for testing')
        await $('#registerOnLogin').click();
        await $('#backOnRegister').waitForDisplayed({timeout: 3000})
        let registrationTitle = await $("#registerForm").getText()
        await expect(registrationTitle).toEqual('Registration')
    });
  
    it('Should not allow to create user with blank input fields', async function() {
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual('Please, provide valid data')
    })
    
    it('Should not allow to create user with blank username', async function() {
        await $('#userNameOnRegister').setValue('')
        await $('#passwordOnRegister').setValue('123abcA!')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Username is required")
    })
    
    it('Should not allow to create user with blank password', async function() {
        await $('#userNameOnRegister').setValue('Hiqo')
        await $('#passwordOnRegister').setValue('')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Password is required")
    })
    
    it('Should not allow to create user with less than 3 characters is username', async function() {
        await $('#userNameOnRegister').setValue('Hi')
        await $('#passwordOnRegister').setValue('123abcA!')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Username should contain at least 3 characters")
    })
    
    it('Should not allow to create user with more than 40 characters is username', async function() {
        await browser.execute(async function() {
            const username = document.querySelector("#userNameOnRegister")
            username.removeAttribute('maxlength')
        })
        await $('#userNameOnRegister').setValue('HiqoHiqoHiqoHiqoHiqoHiqoHiqoHiqoHiqoHiqo!')
        await $('#passwordOnRegister').setValue('123abcA!')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Username can't exceed 40 characters")
    })
    
    it('Should not allow to create user with prefix space in username', async function() {
        await $('#userNameOnRegister').setValue(' Hiqo')
        await $('#passwordOnRegister').setValue('123abcA!')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Prefix and postfix spaces are not allowed is username")
    })
    
    it('Should not allow to create user with postfix space in username', async function() {
        await $('#userNameOnRegister').setValue('Hiqo ')
        await $('#passwordOnRegister').setValue('123abcA!')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Prefix and postfix spaces are not allowed is username")
    })
    
    it('Should not allow to create user with less than 8 characters is password', async function() {
        await $('#userNameOnRegister').setValue('Hiqo')
        await $('#passwordOnRegister').setValue('123abcA')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Password should contain at least 8 characters")
    })
    
    it('Should not allow to create user more less than 20 characters is password', async function() {
        await browser.execute(async function() {
            const username = document.querySelector("#passwordOnRegister")
            username.removeAttribute('maxlength')
        })
        await $('#userNameOnRegister').setValue('Hiqo')
        await $('#passwordOnRegister').setValue('123abcA123abcA123abcA')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Password can't exceed 20 characters")
    })
    
    it('Should not allow to create user without upper case characters is password', async function() {
        await $('#userNameOnRegister').setValue('Hiqo')
        await $('#passwordOnRegister').setValue('123abcaa')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Password should contain at least one character in upper case")
    })
    
    it('Should not allow to create user without lower case characters is password', async function() {
        await $('#userNameOnRegister').setValue('Hiqo')
        await $('#passwordOnRegister').setValue('123ABCAA')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Password should contain at least one character in lower case")
    })
    
    it('Should allow to create user without 3 characters is username and 8 in password', async function() {
        await $('#userNameOnRegister').setValue('Hiq')
        await $('#passwordOnRegister').setValue('123abcA!')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Successfully registered! Please, click Back to return on login page")
    })
    
    it('Should allow to create user without 40 characters is username and 20 in password', async function() {
        await $('#userNameOnRegister').setValue('HiqoUserHiqoUserHiqoUserHiqoUserHiqoUser')
        await $('#passwordOnRegister').setValue('123abcA123abcA123abc')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Successfully registered! Please, click Back to return on login page")
    })
    
    it('Should not allow to create user without credentials that are already in the application', async function() {
        await $('#userNameOnRegister').setValue('HiqoUserHiqoUserHiqoUserHiqoUserHiqoUser')
        await $('#passwordOnRegister').setValue('123abcA123abcA123abc')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Username is in use")
    })
    
    it('Should not allow to create user without credentials that are already in the application', async function() {
        await $('#userNameOnRegister').setValue('HiqoUserHiqoUserHiqoUserHiqoUserHiqoUser')
        await $('#passwordOnRegister').setValue('123abcA123abcA123abc')
        await $('#register').click()
        let errorMessage = await $('#errorMessageOnRegister')
        await errorMessage.waitForDisplayed({timeout: 3000})
        await expect(await errorMessage.getText()).toEqual("Username is in use")
    })
});
