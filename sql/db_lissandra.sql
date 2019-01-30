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

 Date: 29/01/2019 14:01:56
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
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for product_order
-- ----------------------------
DROP TABLE IF EXISTS `product_order`;
CREATE TABLE `product_order` (
  `product_order_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '产品订单id，主键，自增长',
  `product_ids` varchar(255) NOT NULL DEFAULT '' COMMENT '产品id集合',
  `order_no` varchar(255) NOT NULL DEFAULT '' COMMENT '订单编号',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '下单人id',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '下单人姓名',
  `send_information` varchar(255) NOT NULL DEFAULT '' COMMENT '寄送信息',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`product_order_id`) USING BTREE
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
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', '111', '123', 0, 0, '2019-01-29 13:59:09', '2019-01-29 13:59:09');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wallet_order
-- ----------------------------
DROP TABLE IF EXISTS `wallet_order`;
CREATE TABLE `wallet_order` (
  `wallet_order` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '钱包流水id，主键，自增长',
  `wallet_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '钱包id',
  `wallet_order_state` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '流水是否被审批，0-未处理，1-审批通过，2-审批不通过',
  `recharge` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '余额充值',
  `withdraw` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '余额提现',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `user_name` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名称',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，0-存在，1-已被删除',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`wallet_order`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
