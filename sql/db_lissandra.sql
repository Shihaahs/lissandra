/*
 Navicat Premium Data Transfer

 Source Server         : Lissandra(Local)
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : lissandra

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 07/06/2019 19:06:24
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
BEGIN;
INSERT INTO `product` VALUES (11, '短袖', 104.23, '', '夏季新款，简约大方', 16, '最美服装厂', 0, '2019-06-05 20:08:12', '2019-06-05 20:19:23', 1);
INSERT INTO `product` VALUES (12, '毛衣', 233.40, '', '韩版小清新双肩毛衣', 16, '最美服装厂', 0, '2019-06-05 20:18:54', '2019-06-05 20:19:21', 1);
INSERT INTO `product` VALUES (13, '', 0.00, '', '', 18, '水果公司', 1, '2019-06-06 09:38:02', '2019-06-06 09:42:00', 0);
INSERT INTO `product` VALUES (14, '西瓜', 222.20, '', '又大又圆', 18, '水果公司', 0, '2019-06-06 09:42:30', '2019-06-06 09:42:39', 1);
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
  `own_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '接单人id',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '下单人姓名',
  `send_information` varchar(255) NOT NULL DEFAULT '' COMMENT '寄送信息',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`product_order_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_order
-- ----------------------------
BEGIN;
INSERT INTO `product_order` VALUES (13, 0, 'PO-16-20190605-E59F', 17, 16, '石怡杰', '默认快递', 0, '2019-06-05 20:19:00', '2019-06-05 20:19:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_order_ref
-- ----------------------------
BEGIN;
INSERT INTO `product_order_ref` VALUES (43, 13, 11, 7, 0, '2019-06-05 20:19:00', '2019-06-05 20:19:00');
INSERT INTO `product_order_ref` VALUES (44, 13, 12, 2, 0, '2019-06-05 20:19:00', '2019-06-05 20:19:00');
COMMIT;

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
  `is_approval` tinyint(2) unsigned NOT NULL DEFAULT '2' COMMENT '0-审批通过，1-审批不通过，2-未处理',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, '平台管理员', '111', '123', 0, 0, 0, '2019-06-05 19:53:55', '2019-06-05 19:59:12');
INSERT INTO `user` VALUES (16, '最美服装厂', '111111', '13300000001', 1, 0, 0, '2019-06-05 20:02:00', '2019-06-05 20:06:09');
INSERT INTO `user` VALUES (17, '石怡杰', '123123', '18700000001', 2, 0, 0, '2019-06-05 20:05:18', '2019-06-05 20:06:11');
INSERT INTO `user` VALUES (18, '水果公司', '123123', '13300000002', 1, 0, 0, '2019-06-06 09:36:50', '2019-06-06 09:37:38');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wallet
-- ----------------------------
BEGIN;
INSERT INTO `wallet` VALUES (3, 17, '石怡杰', 8000.00, 0, '2019-06-05 20:05:18', '2019-06-05 20:05:18');
COMMIT;

-- ----------------------------
-- Table structure for wallet_order
-- ----------------------------
DROP TABLE IF EXISTS `wallet_order`;
CREATE TABLE `wallet_order` (
  `wallet_order_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '钱包流水id，主键，自增长',
  `wallet_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '钱包id',
  `wallet_order_state` tinyint(2) unsigned NOT NULL DEFAULT '2' COMMENT '流水是否被审批，0-审批通过，1-审批不通过，2-未处理',
  `recharge` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '余额充值',
  `withdraw` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '余额提现',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名称',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `wallet_order_no` varchar(20) NOT NULL DEFAULT '' COMMENT '钱包订单流水号',
  `wallet_order_way` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '操作类型，0-不操作，1-提现，2-充值',
  `wallet_order_money` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '操作金额',
  PRIMARY KEY (`wallet_order_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wallet_order
-- ----------------------------
BEGIN;
INSERT INTO `wallet_order` VALUES (15, 3, 0, 10000.00, 0.00, 17, '石怡杰', 0, '2019-06-05 20:20:36', '2019-06-05 20:20:48', 'WO-17-20190605-8FC1', 2, 10000.00);
INSERT INTO `wallet_order` VALUES (16, 3, 0, 0.00, 2000.00, 17, '石怡杰', 0, '2019-06-05 20:21:10', '2019-06-05 20:21:39', 'WO-17-20190605-075F', 1, 2000.00);
INSERT INTO `wallet_order` VALUES (17, 3, 1, 0.00, 5000.00, 17, '石怡杰', 0, '2019-06-05 20:21:56', '2019-06-05 20:22:14', 'WO-17-20190605-7C22', 1, 5000.00);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
