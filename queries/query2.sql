select count (*) from lineitem, orders where l_orderkey = o_orderkey and o_totalprice >= 400000;
select count (*) from lineitemAQP, ordersAQP where l_orderkey = o_orderkey and o_totalprice >= 400000;