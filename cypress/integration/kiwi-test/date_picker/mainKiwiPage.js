const URL = 'https://www.kiwi.com/en/'
const COOKIE_BTN = 'button[data-test="customizeCookieConsent"]'
const ACCEPT_COOKIES_BTN = '(//button[@data-test="acceptCookies"])[2]'
const SEARCH_FIELD_DEPARTURE = '(//input[@data-test="SearchFieldDateInput"])[1]'
const NEXT_CALENDAR_PAGE = '//button[@data-test="CalendarMoveNextButton"]'
const FIRST_MONTH_OPTION = '(//button[@data-test = "DatepickerMonthButton"])[1]/div/div'
const SECOND_MONTH_OPTION = '(//button[@data-test = "DatepickerMonthButton"])[2]' 
const DATE_PICKER_MONTH = 'button[data-test="DatepickerMonthButton"]'
const DATE = 'div[data-test="DateValue"]'
const SET_DATE_BTN = 'button[data-test="SearchFormDoneButton"]'
const LANDING_SEARCH_BTN = 'a[data-test = "LandingSearchButton"]'
let DAYS_FIRST_CONTAINER = ''
let DAYS_SECOND_CONTAINER = ''

class KiwiPage {
	static visitKiwiPage() {
		cy.visit(URL)
	}

	static acceptCookies() {
		cy.get(COOKIE_BTN).then($button => {
			if ($button.is(':visible')) {
				cy.xpath(ACCEPT_COOKIES_BTN).click()
			}
		})
	}

	static openDatePickerContainer() {
		cy.xpath(SEARCH_FIELD_DEPARTURE).click()
	}

	static chooseReturn() {
		cy.get(DATE).eq(1).click()
	}

	static slectDateMonthAndYear(date, monthYear) {
		cy.xpath(FIRST_MONTH_OPTION).then($firstMonth => {
			if ($firstMonth.text().includes(monthYear)) {
				DAYS_FIRST_CONTAINER =
					'(//div[@data-test="CalendarContainer"])[1]/div//div[(text()="' +	date +'")]'
				cy.xpath(DAYS_FIRST_CONTAINER).click()
			} else {
				cy.xpath(SECOND_MONTH_OPTION).then($secondMonth => {
					if ($secondMonth.text().includes(monthYear)) {
						DAYS_SECOND_CONTAINER =
							'(//div[@data-test="CalendarContainer"])[2]/div//div[(text()="' +	date +'")]'
						cy.xpath(DAYS_SECOND_CONTAINER).click()
					} else {
						throughLoop(date, monthYear)
					}
				})
			}
		})
	}

	static setDates() {
		cy.get(SET_DATE_BTN).click()
	}

	static clickSearchForTrip() {
		cy.get(LANDING_SEARCH_BTN).click()
	}

	static urlIsLoadedProperly() {
		// TODO add more validation
		cy.url().should('include', 'search')
	}
}

async function throughLoop(date, monthYear) {
  //TODO solve the problem with async
  let isMyMonthYear = false;
  let secondMonth = null;
  while(!isMyMonthYear) {
      cy.xpath(NEXT_CALENDAR_PAGE).click()
      
      secondMonth = await cy.get(DATE_PICKER_MONTH).eq(1);
      
      if (secondMonth.text().includes(monthYear)) {
          isMyMonthYear = true
          DAYS_SECOND_CONTAINER = '(//div[@data-test="CalendarContainer"])[2]/div//div[(text()="' + date +'")]'
          cy.xpath(DAYS_SECOND_CONTAINER).click()
        }
  }
}
export default KiwiPage