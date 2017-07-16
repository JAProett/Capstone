from bs4 import BeautifulSoup as BS
import os


html = open("charts.html",'r').read()
soup = BS(html,'html.parser')

def make_charts(soup):
    site_names = []
    img_src = []
    for content in soup.find_all('h1', {'class' : 'bycontentfolder toc'}):
        content_str = str(content)
        sliced_cont = content_str[51:]
        sliced_cont = sliced_cont[:-5]
        site_names.append(sliced_cont)


    for imgtag in soup.find_all('img'):
        src_content = imgtag
        src_content = str(src_content)
        img_src.append(src_content)
    # print(img_src)
    print(len(img_src))
    destination = '../front_end/assets/charts'

    for name, src in zip(site_names, img_src):
        filename = (name)
        fh = open(os.path.join(destination, filename), "w")
        fh.write(name)
        fh.close()


print(make_charts(soup))
