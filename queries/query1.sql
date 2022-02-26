select count (*) from lineitem, orders where l_orderkey = o_orderkey;
select count (*) from lineitemAQP, ordersAQP where l_orderkey = o_orderkey;