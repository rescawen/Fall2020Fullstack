describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Wenlei Dai',
      username: 'wenlei',
      password: 'wenlei'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-cy=username]').type('wenlei')
      cy.get('[data-cy=password]').type('wenlei')
      cy.get('[data-cy=login-button]').click()
      cy.get('[data-cy=notificationSuccess]')
        .should('contain', 'Wenlei Dai has successfully logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Wrong username or password')
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-cy=username]').type('wenlei')
      cy.get('[data-cy=password]').type('wrong')
      cy.get('[data-cy=login-button]').click()
      cy.get('[data-cy=notificationFailure]')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Wenlei Dai has successfully logged in')
    })
  })

  // describe.only makes other tests disappear from this file
  // describe.only('When logged in', function() {
  //   beforeEach(function() {
  //     // log in user here
  //   })

  //   it('A blog can be created', function() {
  //     // ...
  //   })
  // })

  describe('When logged in', function () {
    beforeEach(function () {
      // log in user here
    })

    it('A blog can be created', function () {
      // ...
    })
  })

})