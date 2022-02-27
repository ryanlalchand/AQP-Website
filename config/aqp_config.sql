CREATE TABLE if not exists lineitemAQP (
    SELECT * FROM lineitem
        ORDER BY RAND()
        LIMIT (.01 * 
            (SELECT COUNT(*) FROM lineitem)));

CREATE TABLE if not exists ordersAQP (
    SELECT * FROM orders
        ORDER BY RAND()
        LIMIT (.01 * 
            (SELECT COUNT(*) FROM orders)));