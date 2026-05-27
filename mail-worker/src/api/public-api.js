import app from '../hono/hono';
import result from '../model/result';
import publicService from '../service/public-service';

import emailService from '../service/email-service';




app.post('/public/genToken', async (c) => {
	const data = await publicService.genToken(c, await c.req.json());
	return c.json(result.ok(data));
});

app.post('/public/emailList', async (c) => {
	const list = await publicService.emailList(c, await c.req.json());
	return c.json(result.ok(list));
});

app.post('/public/addUser', async (c) => {
	await publicService.addUser(c, await c.req.json());
	return c.json(result.ok());
});

// 新增以下代码（物理删除邮件的公开API）
app.delete('/public/physicsDeleteEmail', async (c) => {  // 使用DELETE方法，路径自定义
  // c.req.json() 获取POST/DELETE body中的JSON数据
  const params = await c.req.json();  // 期望body中包含 { "emailIds": "1,2,3" }  
  // const token = c.req.header('Authorization'); // 从Header获取token
  await emailService.physicsDelete(c, params);  // 直接调用已存在的物理删除函数
  return c.json(result.ok());  // 返回成功
});
