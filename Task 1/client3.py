import urllib.request
import time
import json
import random


QUERY = "http://localhost:8020/query?id={}"


N = 500

def getDataPoint(quote):
  stock = quote['stock']
  bid_price = float(quote['top_bid']['price'])
  ask_price = float(quote['top_ask']['price'])
  price = (bid_price + ask_price)/2
  return stock, bid_price, ask_price, price

def getRatio(price_a, price_b):
  if (price_b == 0):
    return
  elif (price_a and price_b ==0):
    return
  return price_a/price_b


if __name__ == "__main__":
  for _ in iter(range(N)):
    quotes = json.loads(urllib.request.urlopen(QUERY.format(random.random())).read())


    prices={}
    for quote in quotes:
      stock, bid_price, ask_price, price = getDataPoint(quote)
      prices[stock] = price
      print ("Quoted %s at (bid:%s, ask:%s, price:%s)" % (stock, bid_price, ask_price, price))
    
    print ("Ratio %s" % (getRatio(prices['ABC'] , prices['DEF'])))
