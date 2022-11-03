let desctext: any;
describe('E2E TEST FOR WEATHER-APP', () => {
  before(() => {
    cy.visit('/')

  })

  it('Visits the initial project page and Check the objects', () => {
    cy.contains('Get the today\'s forecast for your city!');
    cy.contains('MyWeather');
    cy.contains('h2.city-card__header', 'Get the today\'s forecast for your city!')
      .should('have.class', 'city-card__header')
  })
  it('Type istanbul on Search Bar and Check Results', () => {
    cy.get('input').type('Istanbul').type('{enter}');
    cy.url().should('include', '/Istanbul')
    cy.contains('Get the today\'s forecast for your city!');
    cy.contains('Get the today\'s weather for your city!');
    cy.get('.city-card').should('have.length', 2);

  })

  it('Check "Description" Network Results', () => {
    cy.get('.city-card__city-name .city-card__sky-state').then(($btn) => {
      // redefine text reference
      let text = $btn.text()
      desctext = text;
    })

    cy.request('https://api.openweathermap.org/data/2.5/weather?appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&q=istanbul&units=metric').as('comments')
    cy.get('@comments').should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name', 'Istanbul')
      expect(response.body.weather[0]).to.have.property('description', desctext.trim());
    })
  })
})
