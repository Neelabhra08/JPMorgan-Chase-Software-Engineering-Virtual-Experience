import { ServerRespond } from './DataStreamer';

export interface Row {
  //Updated for new schema
  price_abc: number,
  prie_def: number,
  ratio: number,
  timestamp: Date,
  upperBound: number,
  lowerBound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  //Generating the ratio from the upperbound and lowerbound of the data set
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF; 
    const upper_bound = 1 + 0.025;
    const lower_bound = 1 - 0.025;
    return {
      //generation the desired graph 
      price_abc: priceABC,
      prie_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      upperBound: upper_bound,
      lowerBound: lower_bound,
      trigger_alert: (ratio > upper_bound || ratio < lower_bound)? ratio : undefined,

    };
  }
}
