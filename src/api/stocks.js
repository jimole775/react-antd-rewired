import request from '@/utils/request'
// vline
// heavies, // 买入总额
//     timeRange: `${rangeCans[0].t} ~ ${rangeCans[rangeCans.length - 1].t}`, // 买入总额
//     buy_p_v: (sum_buy_p / (sum_buy_v * 100)).toFixed(2), // 买入均价
//     sal_p_v: (sum_sal_p / (sum_sal_v * 100)).toFixed(2), // 卖出均价
//     sum_buy_p: sum_buy_p, // 买入总额
//     sum_buy_v: sum_buy_v, // 买入手数
//     sum_sal_p: sum_sal_p, // 卖出总额
//     sum_sal_v: sum_sal_v, // 卖出手数
//     heavy_buy: heavy_buy, // 大单买入额
//     heavy_sal: heavy_sal // 大单卖出额
export function getvline(data) {
  return request({
    url: '/api/vline',
    method: 'post',
    data
  })
}