import json
from selenium import webdriver
from bs4 import BeautifulSoup as bs

# Selenium browser to open the URL and get page source
browser = webdriver.Chrome('./chromedriver')
browser.implicitly_wait(30)
browser.get('https://www.zomato.com/bangalore/restaurants')
html_data = browser.page_source

# BeautifulSoup library to parse the HTML data
soup = bs(html_data, 'html.parser')

# Get list of all restaurant URLs from start page
url_list = [a['href'] for a in soup.findAll('a', attrs={'class' : 'result-title hover_feedback zred bold ln24 fontsize0 '})]
restaurant_data = {}

# Visit each URL and scrape required data using
# the attributes that were obtained manually
for url in url_list:
    restaurant_data[url] = {}
    browser.get(url)
    html_data = browser.page_source
    soup = bs(html_data, 'html.parser')

    restaurant_data[url]['name'] = soup.find('a', attrs={'class' : 'ui large header left'}).text.strip()
    map_data = soup.find('div', attrs={'class' : 'resmap-img'})['data-url']
    restaurant_data[url]['location'] = tuple(map(float, map_data.split('markers=')[1].split(',')[:2]))
    restaurant_data[url]['rating'] = soup.find('div', attrs={'class': 'rating-div'}).text.strip()
    restaurant_data[url]['reviews'] = [a.contents[2].strip() for a in soup.findAll('div', attrs={'class' : 'rev-text'})]

browser.quit()

# Store obtained data in the form of JSON object
with open("restaurant_data.json", 'w') as outfile:
    json.dump(restaurant_data, outfile)