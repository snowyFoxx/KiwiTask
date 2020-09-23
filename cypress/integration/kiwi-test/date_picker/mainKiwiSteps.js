import { And, Given, When } from 'cypress-cucumber-preprocessor/steps'
import KiwiPage from './mainKiwiPage'

Given('Log on the page', () => {
    KiwiPage.visitKiwiPage()
})

When('cookies are accepted', () => {
    KiwiPage.acceptCookies()
})

When('navigate to date picker container', () => {
    KiwiPage.openDatePickerContainer()
})

And('select departure date as {string}, {string}', (depDate, depMonthYear) => {
    KiwiPage.slectDateMonthAndYear(depDate, depMonthYear)
})

And('select arrival date as {string}, {string}', (arrDay, arrMonthYear) => {
    KiwiPage.chooseReturn()
    KiwiPage.slectDateMonthAndYear(arrDay, arrMonthYear)
})

And('confirm set dates', ()=> {
    KiwiPage.setDates()
})

When('searching for trip with added criteria', () => {
    KiwiPage.clickSearchForTrip()
})

Then('customer should be redirected to result page', () => {
    KiwiPage.urlIsLoadedProperly()
})
