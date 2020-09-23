Feature: Date picker functionality

Scenario Outline: Using diff valid dates for kiwi date picker
    Given Log on the page
    And   cookies are accepted
    When  navigate to date picker container
    And   select departure date as "<departure date>", "<departure month and year>"
    And   select arrival date as "<arrival date>", "<arrival month and year>"
    And   confirm set dates
    When  searching for trip with added criteria
    Then  customer should be redirected to result page

    Examples:
        | departure date   | departure month and year  | arrival date   | arrival month and year        |
        | 24               | September 2020            | 28             | October 2020                  |