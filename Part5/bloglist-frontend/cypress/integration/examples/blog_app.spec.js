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
      cy.get('[data-cy=notification-success]')
        .should('contain', 'Wenlei Dai has successfully logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Wrong username or password')
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-cy=username]').type('wenlei')
      cy.get('[data-cy=password]').type('wrong')
      cy.get('[data-cy=login-button]').click()
      cy.get('[data-cy=notification-failure]')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Wenlei Dai has successfully logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'wenlei', password: 'wenlei' })
    })

    it('a blog can be created', function () {
      cy.get('[data-cy=new-blog]').click()
      cy.get('[data-cy=blog-title]').type('cypress is great')
      cy.get('[data-cy=blog-author]').type('wenlei')
      cy.get('[data-cy=blog-url]').type('https://docs.cypress.io/guides/overview/why-cypress.html')
      cy.get('[data-cy=create-blog-button]').click()
      cy.get('[data-cy=notification-success]')
        .should('contain', 'cypress is great by wenlei added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('cypress is great wenlei')
    })

  })

  describe('When logged in and blogs list is not empty', function () {

    const likeTestBlog = {
      title: 'when a user is logged in',
      author: 'it can like a blog',
      url: 'testing it here',
      likes: 1
    }

    beforeEach(function () {
      cy.login({ username: 'wenlei', password: 'wenlei' })
      cy.createBlog(likeTestBlog)
    })

    it('a blog can be liked', function () {
      cy.get('[data-cy=blog-toggle-open]').click()
      cy.get('[data-cy=like-blog]').click()
      cy.get('[data-cy=blog]')
        .should('contain', `likes ${likeTestBlog.likes + 1}`)
    })

    it('a blog can be deleted', function () {
      cy.get('[data-cy=blog-toggle-open]').click()
      cy.get('[data-cy=delete-blog]').click()
      cy.get('html').should('not.contain', 'when a user is logged in it can like a blog')
    })

  })

  describe('When there are multiple blogs', function () {

    const noLikeBlog = { title: 'nolike', author: 'nolike', url: 'nolike', likes: 0 }
    const no1LikeBlog = { title: 'nolike', author: 'nolike', url: 'nolike', likes: 0 }
    const oneLikeBlog = { title: 'onelike', author: 'onelike', url: 'onelike', likes: 1 }
    const twoLikeBlog = { title: 'twolikes', author: 'twolikes', url: 'twolikes', likes: 2 }
    const two2LikeBlog = { title: 'twolikes', author: 'twolikes', url: 'twolikes', likes: 2 }
    const treLikeBlog = { title: 'trelikes', author: 'trelikes', url: 'trelikes', likes: 3 }

    beforeEach(function () {
      cy.login({ username: 'wenlei', password: 'wenlei' })
      cy.createBlog(noLikeBlog)
      cy.createBlog(no1LikeBlog)
      cy.createBlog(oneLikeBlog)
      cy.createBlog(twoLikeBlog)
      cy.createBlog(two2LikeBlog)
      cy.createBlog(treLikeBlog)
    })

    it('the order the blogs sorted by amount of likes from largest first', function () {
      cy.get('[data-cy=blog-toggle-open]').click({ multiple: true })
      cy.get('[data-cy=blog-likes]').then(bloglikes => {

        let currentLike = Number.MAX_SAFE_INTEGER
        for (let index = 0; index < bloglikes.length; index++) {
          cy.expect(currentLike).to.be.at.least(Number(bloglikes[index].innerText))
          currentLike = Number(bloglikes[index].innerText)
        }
      })
    })
  })

})