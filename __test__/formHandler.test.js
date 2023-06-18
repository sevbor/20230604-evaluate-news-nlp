import { handleSubmit } from "../src/client/js/formHandler"

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    // Mock necessary dependencies
    const mockInputValue = 'https://de.wikipedia.org/wiki/Representational_State_Transfer';
    const mockSummary = 'Example summary';

    // Create a mock DOM environment using JSDOM
    const dom = new JSDOM('<html><body></body></html>');
    global.document = dom.window.document;

    // Create a mock input element and assign the value
    const inputElement = dom.window.document.createElement('input');
    inputElement.id = 'name';
    inputElement.value = mockInputValue;

    // Append the input element to the body of the mock DOM
    dom.window.document.body.appendChild(inputElement);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ key: '5ce27b79480e516c8adf35f70b5a18d0' }),
      })
    );

    global.getSummary = jest.fn(() =>
      Promise.resolve({ body: { summary: mockSummary } })
    );

    // Create a mock event object with a preventDefault method
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    // Create a mock element for the 'results' element
    const mockResultsElement = {
      innerHTML: '',
    };

    // Mock the getElementById method to return the mock results element
    jest.spyOn(dom.window.document, 'getElementById').mockReturnValueOnce(mockResultsElement);

    // Call the handleSubmit function with the mock event
    handleSubmit(mockEvent);

    // Check if the necessary functions were called
    expect(Client.checkForName).toHaveBeenCalledWith(mockInputValue);
    expect(Client.checkForNews).toHaveBeenCalledWith(mockInputValue);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8081/APIKEY');
    expect(global.getSummary).toHaveBeenCalledWith(
      mockInputValue,
      '5ce27b79480e516c8adf35f70b5a18d0'
    );

    // Check if preventDefault was called on the mock event
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Check if the 'results' element has the expected innerHTML
    expect(mockResultsElement.innerHTML).toBe(mockSummary);
  });
});
