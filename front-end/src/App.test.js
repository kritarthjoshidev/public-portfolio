import { render, screen } from '@testing-library/react';
import App from './App';
import profileData from "./profiledata.json";

import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe("profileData", () => {

  it('json not null', () => {
    expect(profileData).not.toBeNull();
  });

  it('json length not 0', () => {
    expect(profileData).not.toHaveLength(0);
  });

  it('json item .id has to be number', () => {
    expect(profileData[0].id).toBeGreaterThanOrEqual(0);
  });

  it('json item .title not empty', () => {
    expect(profileData[0].title).not.toBe('');
  });

  it('json item .img not empty', () => {
    expect(profileData[0].img).toBeTruthy();
  });

  it('json item .imgalt not empty', () => {
    expect(profileData[0].imgalt).toBeTruthy();
  });

  it('json item .technologies not empty', () => {
    expect(profileData[0].technologies).toBeTruthy();
  });

  it('json item .role not empty', () => {
    expect(profileData[0].role).toBeTruthy();
  });
});

describe('render the Profile data list', () => {

  it('render the Profile data cards', () => {
    render(<App />);

    for (let item of profileData) {
      let title = item.title;
      let imgalt = item.imgalt;

      screen.getByText(title);
      screen.getByAltText(imgalt);
    }
  });

  it('render one modal data', async () => {
    const user = userEvent.setup();

    act(() => {
      render(<App />);
    });

    const cardItem = screen.getByText(/google.com 1/i);
    await user.click(cardItem);

    const cardItemModal = screen.getByText(/other notes about the website/i);
    expect(cardItemModal).toBeInTheDocument();

  });

});




