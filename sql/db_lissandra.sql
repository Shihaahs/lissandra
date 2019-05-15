/*
 Navicat Premium Data Transfer

 Source Server         : Lissandra(Local)
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : db_lissandra

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 05/03/2019 10:00:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id，主键，自增长',
  `product_name` varchar(255) NOT NULL DEFAULT '' COMMENT '商品名称',
  `product_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '商品价格',
  `product_image` varchar(255) NOT NULL DEFAULT '' COMMENT '商品图片',
  `product_description` varchar(255) NOT NULL DEFAULT '' COMMENT '商品描述',
  `product_manufacture_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '生产商id',
  `product_manufacture_name` varchar(255) NOT NULL DEFAULT '' COMMENT '生产商名称',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_shelf` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '是否上架，0-未上架，1-已上架',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (1, '薯片', 8.50, 'aa', '乐视薯片', 3, '江南皮革厂', 0, '2019-02-03 21:38:32', '2019-02-03 21:39:00', 1);
INSERT INTO `product` VALUES (2, '苹果', 32.20, 'bb', '富士康苹果', 3, '江南皮革厂', 0, '2019-02-03 21:39:54', '2019-02-03 21:39:54', 0);
INSERT INTO `product` VALUES (3, '耳机', 202.66, '', 'BYZ 不是所有耳机', 3, '江南皮革厂', 0, '2019-02-18 15:31:53', '2019-02-18 15:53:36', 0);
COMMIT;

-- ----------------------------
-- Table structure for product_order
-- ----------------------------
DROP TABLE IF EXISTS `product_order`;
CREATE TABLE `product_order` (
  `product_order_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '产品订单id，主键，自增长',
  `product_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '产品id',
  `product_order_no` varchar(255) NOT NULL DEFAULT '' COMMENT '订单编号',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '下单人id',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '下单人姓名',
  `send_information` varchar(255) NOT NULL DEFAULT '' COMMENT '寄送信息',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`product_order_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_order
-- ----------------------------
BEGIN;
INSERT INTO `product_order` VALUES (1, 1, 'PO-2-20190203-2TEL', 2, '石傻傻', '送到北京', 0, '2019-02-03 21:40:59', '2019-02-18 15:09:49');
COMMIT;

-- ----------------------------
-- Table structure for product_order_ref
-- ----------------------------
DROP TABLE IF EXISTS `product_order_ref`;
CREATE TABLE `product_order_ref` (
  `product_order_ref_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键，自增长',
  `product_order_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '订单id',
  `product_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '商品id',
  `product_quantity` bigint(20) unsigned NOT NULL DEFAULT '1' COMMENT '商品数量',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`product_order_ref_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名称',
  `password` varchar(255) NOT NULL DEFAULT '' COMMENT '登录密码',
  `phone` varchar(11) NOT NULL DEFAULT '' COMMENT '登录手机',
  `permission` tinyint(2) unsigned NOT NULL DEFAULT '3' COMMENT '角色权限，0-管理员，1-品牌商，2-借卖方',
  `is_approval` tinyint(2) unsigned NOT NULL DEFAULT '2' COMMENT '0-审批不通过，1-审批通过，2-未处理',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', '111', '123', 0, 0, 0, '2019-01-29 13:59:09', '2019-01-30 17:20:47');
INSERT INTO `user` VALUES (2, '石傻傻', '111', '13338712526', 2, 0, 0, '2019-02-03 21:26:35', '2019-02-03 21:26:35');
INSERT INTO `user` VALUES (3, '江南皮革厂', '111', '12345678900', 1, 0, 0, '2019-02-03 21:36:09', '2019-02-03 21:36:09');
INSERT INTO `user` VALUES (4, '阿邦', '112211', '12345678912', 2, 1, 0, '2019-02-18 14:07:10', '2019-02-19 16:08:11');
COMMIT;

-- ----------------------------
-- Table structure for wallet
-- ----------------------------
DROP TABLE IF EXISTS `wallet`;
CREATE TABLE `wallet` (
  `wallet_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '钱包id，主键。自增长',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名称',
  `balance` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '余额',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`wallet_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wallet
-- ----------------------------
BEGIN;
INSERT INTO `wallet` VALUES (1, 2, '石傻傻', 9000.00, 0, '2019-02-03 21:41:27', '2019-02-19 16:25:26');
COMMIT;

-- ----------------------------
-- Table structure for wallet_order
-- ----------------------------
DROP TABLE IF EXISTS `wallet_order`;
CREATE TABLE `wallet_order` (
  `wallet_order_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '钱包流水id，主键，自增长',
  `wallet_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '钱包id',
  `wallet_order_state` tinyint(2) unsigned NOT NULL DEFAULT '2' COMMENT '流水是否被审批，0-审批不通过，1-审批通过，2-未处理',
  `recharge` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '余额充值',
  `withdraw` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '余额提现',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名称',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `wallet_order_no` varchar(20) NOT NULL DEFAULT '' COMMENT '钱包订单流水号',
  PRIMARY KEY (`wallet_order_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wallet_order
-- ----------------------------
BEGIN;
INSERT INTO `wallet_order` VALUES (1, 1, 0, 1000.00, 0.00, 2, '石傻傻', 0, '2019-02-03 21:41:57', '2019-02-19 15:26:43', 'WO-2-20190203-G2ED');
INSERT INTO `wallet_order` VALUES (2, 1, 2, 500.00, 0.00, 2, '石傻傻', 0, '2019-02-19 15:46:35', '2019-02-19 15:51:11', 'WO-2-20190219-17AA');
INSERT INTO `wallet_order` VALUES (3, 1, 2, 10000.00, 0.00, 2, '石傻傻', 0, '2019-02-19 15:50:07', '2019-02-19 15:50:07', 'WO-2-20190219-A7FD');
INSERT INTO `wallet_order` VALUES (4, 1, 0, 0.00, 4000.00, 2, '石傻傻', 0, '2019-02-19 15:56:11', '2019-02-19 15:56:11', 'WO-2-20190219-5F17');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
