from selenium import webdriver
from bs4 import BeautifulSoup as bs

browser = webdriver.Chrome('./chromedriver')
browser.implicitly_wait(30)
browser.get('https://www.zomato.com/bangalore/restaurants')
html_data = browser.page_source
#print('Data obtained')

soup = bs(html_data, 'html.parser')
#print(soup)
#browser.quit()

url_list = [a['href'] for a in soup.findAll('a', attrs={'class' : 'result-title hover_feedback zred bold ln24 fontsize0 '})]

for i in url_list:
    browser.get(i)
browser.quit()