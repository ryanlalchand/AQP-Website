select count(*) from lineitem, orders where l_orderkey = o_orderkey and l_quantity < 20;
